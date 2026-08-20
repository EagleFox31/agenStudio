/// <reference types="@cloudflare/workers-types" />
import {
  ContactPayload,
  contactFieldErrors,
  type ContactPayloadType,
  type TimelineId,
} from '../../src/lib/contact-schema';

interface Env {
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  RATE_LIMIT?: KVNamespace;
}

type ProblemBody = {
  type: 'about:blank';
  title: string;
  status: number;
  code: string;
  errors?: { pointer: string; code: string }[];
};

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 60 * 15;
const IDEMPOTENCY_TTL_SECONDS = 60 * 15;

const TIMELINE_LABEL: Record<TimelineId, string> = {
  asap: 'Urgent (< 1 mois)',
  '1_3m': '1–3 mois',
  '3_6m': '3 mois et +',
  tbd: 'À définir',
};

function json(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...(init.headers ?? {}),
    },
  });
}

function problem(
  status: number,
  code: string,
  extra?: { errors?: ProblemBody['errors']; headers?: HeadersInit }
): Response {
  const body: ProblemBody = {
    type: 'about:blank',
    title: code,
    status,
    code,
    ...(extra?.errors ? { errors: extra.errors } : {}),
  };
  return json(body, { status, headers: extra?.headers });
}

function envReady(env: Env): env is Env & {
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
} {
  return Boolean(
    env.TURNSTILE_SECRET_KEY &&
      env.RESEND_API_KEY &&
      env.CONTACT_TO_EMAIL &&
      env.CONTACT_FROM_EMAIL
  );
}

function readIdempotencyKey(request: Request): string | null {
  const raw = request.headers.get('Idempotency-Key')?.trim() ?? '';
  if (raw.length < 16 || raw.length > 255) return null;
  if (!/^[\w.-]+$/.test(raw)) return null;
  return raw;
}

async function replayIdempotent(
  kv: KVNamespace | undefined,
  key: string | null
): Promise<Response | null> {
  if (!kv || !key) return null;
  const raw = await kv.get(`idem:${key}`);
  if (!raw) return null;
  try {
    const cached = JSON.parse(raw) as { status: number; body: unknown };
    return json(cached.body, { status: cached.status });
  } catch {
    return null;
  }
}

async function rememberIdempotent(
  kv: KVNamespace | undefined,
  key: string | null,
  status: number,
  body: unknown
): Promise<void> {
  if (!kv || !key || status !== 200) return;
  await kv.put(`idem:${key}`, JSON.stringify({ status, body }), {
    expirationTtl: IDEMPOTENCY_TTL_SECONDS,
  });
}

async function verifyTurnstile(secret: string, token: string, ip?: string): Promise<boolean> {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });
    if (!res.ok) return false;
    const body = (await res.json()) as { success?: boolean };
    return Boolean(body.success);
  } catch {
    return false;
  }
}

async function isRateLimited(kv: KVNamespace | undefined, ip: string): Promise<boolean> {
  if (!kv) return false;
  const key = `contact:${ip}`;
  const raw = await kv.get(key);
  const count = raw ? Number.parseInt(raw, 10) : 0;
  if (Number.isFinite(count) && count >= RATE_LIMIT_MAX) return true;
  await kv.put(key, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW_SECONDS });
  return false;
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    c === '&'
      ? '&amp;'
      : c === '<'
        ? '&lt;'
        : c === '>'
          ? '&gt;'
          : c === '"'
            ? '&quot;'
            : '&#39;'
  );
}

function renderEmail(payload: ContactPayloadType): { subject: string; html: string; text: string } {
  const subject = `[AgenStudio] Nouvelle demande — ${payload.name}`;
  const rows: [string, string][] = [
    ['Nom', payload.name],
    ['Email', payload.email],
    ['Organisation', payload.company || '—'],
    ['Délai', TIMELINE_LABEL[payload.timeline]],
    ['Langue', payload.lang],
  ];
  const html = `
  <div style="font-family:Inter,system-ui,sans-serif;background:#F7F4EE;padding:24px;color:#172128;">
    <h1 style="font-family:Sora,sans-serif;font-size:20px;margin:0 0 16px;color:#172128;">
      Nouvelle demande via le site AgenStudio
    </h1>
    <table style="border-collapse:collapse;width:100%;background:white;border:1px solid #172128;border-radius:8px;overflow:hidden;">
      ${rows
        .map(
          ([k, v]) =>
            `<tr>
              <th align="left" style="padding:10px 14px;background:#F7F4EE;color:#4A5862;font-family:'IBM Plex Mono',monospace;font-size:12px;width:130px;">${escape(k)}</th>
              <td style="padding:10px 14px;color:#172128;font-size:14px;">${escape(v)}</td>
             </tr>`
        )
        .join('')}
    </table>
    <h2 style="font-family:Sora,sans-serif;font-size:16px;margin:20px 0 8px;color:#007C83;">Besoin décrit</h2>
    <div style="white-space:pre-wrap;background:white;padding:16px;border:1px solid #172128;border-radius:8px;font-size:14px;line-height:1.55;">
      ${escape(payload.problem)}
    </div>
  </div>`;
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), '', 'Besoin décrit:', payload.problem].join(
    '\n'
  );
  return { subject, html, text };
}

async function sendEmail(
  env: Env & { RESEND_API_KEY: string; CONTACT_TO_EMAIL: string; CONTACT_FROM_EMAIL: string },
  payload: ContactPayloadType
): Promise<boolean> {
  const { subject, html, text } = renderEmail(payload);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: payload.email,
      subject,
      html,
      text,
    }),
  });
  return res.ok;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const idempotencyKey = readIdempotencyKey(request);
  const replayed = await replayIdempotent(env.RATE_LIMIT, idempotencyKey);
  if (replayed) return replayed;

  const ip =
    request.headers.get('CF-Connecting-IP') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '0.0.0.0';

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return problem(400, 'invalid_json');
  }

  const parsed = ContactPayload.safeParse(body);
  if (!parsed.success) {
    return problem(422, 'validation_failed', { errors: contactFieldErrors(parsed.error) });
  }

  const payload = parsed.data;

  if (payload.hp_confirm.trim()) {
    const ok = { ok: true as const };
    await rememberIdempotent(env.RATE_LIMIT, idempotencyKey, 200, ok);
    return json(ok, { status: 200 });
  }

  if (!envReady(env)) {
    return problem(503, 'misconfigured');
  }

  if (await isRateLimited(env.RATE_LIMIT, ip)) {
    return problem(429, 'rate_limited', { headers: { 'Retry-After': '900' } });
  }

  if (payload.turnstileToken.length < 10) {
    return problem(400, 'turnstile_failed');
  }

  const turnstileOk = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, payload.turnstileToken, ip);
  if (!turnstileOk) {
    return problem(400, 'turnstile_failed');
  }

  const emailOk = await sendEmail(env, payload);
  if (!emailOk) {
    return problem(502, 'send_failed');
  }

  const ok = { ok: true as const };
  await rememberIdempotent(env.RATE_LIMIT, idempotencyKey, 200, ok);
  return json(ok, { status: 200 });
};

export const onRequest: PagesFunction<Env> = async ({ request }) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        Allow: 'POST, OPTIONS',
        'Cache-Control': 'no-store',
      },
    });
  }
  return problem(405, 'method_not_allowed');
};
