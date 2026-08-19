/// <reference types="@cloudflare/workers-types" />
import { z } from 'zod';

interface Env {
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
  RATE_LIMIT?: KVNamespace;
}

const ContactPayload = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(200),
  company: z.string().trim().max(200).optional().default(''),
  problem: z.string().trim().min(20).max(4000),
  timeline: z.string().trim().max(100).optional().default(''),
  lang: z.enum(['fr', 'en']).default('fr'),
  website: z.string().max(0).optional().default(''),
  turnstileToken: z.string().min(10),
});

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 60 * 15;

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

function renderEmail(payload: z.infer<typeof ContactPayload>, ip: string): { subject: string; html: string; text: string } {
  const subject = `[AgenStudio] Nouvelle demande — ${payload.name}`;
  const rows: [string, string][] = [
    ['Nom', payload.name],
    ['Email', payload.email],
    ['Organisation', payload.company || '—'],
    ['Délai', payload.timeline || '—'],
    ['Langue', payload.lang],
    ['IP', ip],
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
  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Besoin décrit:',
    payload.problem,
  ].join('\n');
  return { subject, html, text };
}

async function sendEmail(env: Env, payload: z.infer<typeof ContactPayload>, ip: string): Promise<boolean> {
  const { subject, html, text } = renderEmail(payload, ip);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
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
  const ip =
    request.headers.get('CF-Connecting-IP') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '0.0.0.0';

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = ContactPayload.safeParse(body);
  if (!parsed.success) {
    return json({ error: 'validation_failed' }, { status: 400 });
  }

  const payload = parsed.data;

  if (payload.website) {
    return json({ ok: true }, { status: 200 });
  }

  if (await isRateLimited(env.RATE_LIMIT, ip)) {
    return json({ error: 'rate_limited' }, { status: 429 });
  }

  const turnstileOk = await verifyTurnstile(
    env.TURNSTILE_SECRET_KEY,
    payload.turnstileToken,
    ip
  );
  if (!turnstileOk) {
    return json({ error: 'turnstile_failed' }, { status: 400 });
  }

  const emailOk = await sendEmail(env, payload, ip);
  if (!emailOk) {
    return json({ error: 'send_failed' }, { status: 502 });
  }

  return json({ ok: true }, { status: 200 });
};

export const onRequest: PagesFunction<Env> = async ({ request }) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Allow': 'POST, OPTIONS',
        'Cache-Control': 'no-store',
      },
    });
  }
  return json({ error: 'method_not_allowed' }, { status: 405 });
};
