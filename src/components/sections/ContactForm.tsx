import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import {
  ContactPayload,
  TIMELINE_IDS,
  contactFieldErrors,
  fieldIdFromPointer,
  type ContactFieldId,
} from '../../lib/contact-schema';
import type { TranslationStructure } from '../../lib/i18n';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type FieldErrors = Partial<Record<ContactFieldId, string>>;

interface Copy {
  title: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  problemLabel: string;
  problemPlaceholder: string;
  timelineLabel: string;
  timelineOptions: string[];
  submitButton: string;
  submitting: string;
  successMessage: string;
  errorMessage: string;
  errorSummary: string;
  missingTurnstile: string;
  turnstileRequired: string;
  networkError: string;
  directEmailText: string;
  requiredLabel: string;
  againLabel: string;
  successHeading: string;
  apiErrors: {
    turnstile_failed: string;
    rate_limited: string;
    misconfigured: string;
    send_failed: string;
  };
  fieldErrors: TranslationStructure['contactForm']['fieldErrors'];
}

interface Props {
  lang: 'fr' | 'en';
  turnstileSiteKey?: string;
  copy: Copy;
}

type ProblemBody = {
  code?: string;
  errors?: { pointer: string; code: string }[];
};

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
    onAgenTurnstileLoad?: () => void;
  }
}

const TURNSTILE_SCRIPT =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onAgenTurnstileLoad&render=explicit';

const FIELD_ORDER: ContactFieldId[] = ['name', 'email', 'company', 'problem'];

function messageForCode(
  code: string | undefined,
  copy: Copy,
  fallback: string
): string {
  if (code === 'turnstile_failed') return copy.apiErrors.turnstile_failed;
  if (code === 'rate_limited') return copy.apiErrors.rate_limited;
  if (code === 'misconfigured') return copy.apiErrors.misconfigured;
  if (code === 'send_failed') return copy.apiErrors.send_failed;
  return fallback;
}

function lookupFieldMessage(code: string, copy: Copy): string {
  const known = copy.fieldErrors as Record<string, string>;
  return known[code] ?? copy.errorMessage;
}

function mapFieldErrors(
  items: { pointer: string; code: string }[],
  copy: Copy
): FieldErrors {
  const next: FieldErrors = {};
  for (const item of items) {
    const id = fieldIdFromPointer(item.pointer);
    if (id && !next[id]) next[id] = lookupFieldMessage(item.code, copy);
  }
  return next;
}

export default function ContactForm({ lang, turnstileSiteKey, copy }: Props): React.ReactElement {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [token, setToken] = useState('');
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileHost = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const idempotencyKeyRef = useRef<string | null>(null);

  const getIdempotencyKey = (): string => {
    if (!idempotencyKeyRef.current) {
      idempotencyKeyRef.current = crypto.randomUUID();
    }
    return idempotencyKeyRef.current;
  };

  useEffect(() => {
    if (!turnstileSiteKey) return;
    const mount = () => {
      if (!window.turnstile || !turnstileHost.current) return;
      if (turnstileWidgetId.current) return;
      turnstileWidgetId.current = window.turnstile.render(turnstileHost.current, {
        sitekey: turnstileSiteKey,
        theme: 'light',
        callback: (t: string) => setToken(t),
        'error-callback': () => setToken(''),
        'expired-callback': () => setToken(''),
      });
    };

    window.onAgenTurnstileLoad = mount;
    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = TURNSTILE_SCRIPT;
      s.async = true;
      s.defer = true;
      s.dataset.turnstile = 'true';
      document.head.appendChild(s);
    } else if (window.turnstile) {
      mount();
    }

    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, [turnstileSiteKey]);

  useEffect(() => {
    if (status !== 'error') return;
    summaryRef.current?.focus();
  }, [status, fieldErrors, errorMsg]);

  const resetTurnstile = () => {
    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
      setToken('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setFieldErrors({});
    setErrorMsg('');

    if (!turnstileSiteKey) {
      setStatus('error');
      setErrorMsg(copy.missingTurnstile);
      return;
    }
    if (!token) {
      setStatus('error');
      setErrorMsg(copy.turnstileRequired);
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      company: String(data.get('company') ?? '').trim(),
      problem: String(data.get('problem') ?? '').trim(),
      timeline: String(data.get('timeline') ?? 'tbd'),
      lang,
      hp_confirm: String(data.get('hp_confirm') ?? ''),
      turnstileToken: token,
    };

    const parsed = ContactPayload.safeParse(payload);
    if (!parsed.success) {
      setFieldErrors(mapFieldErrors(contactFieldErrors(parsed.error), copy));
      setStatus('error');
      return;
    }

    setStatus('submitting');

    const post = () =>
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': getIdempotencyKey(),
        },
        body: JSON.stringify(parsed.data),
      });

    try {
      let res = await post();
      if (res.status === 502) {
        await new Promise((resolve) => window.setTimeout(resolve, 400));
        res = await post();
      }

      if (res.ok) {
        setStatus('success');
        form.reset();
        resetTurnstile();
        idempotencyKeyRef.current = null;
        return;
      }

      const body = (await res.json().catch(() => ({}))) as ProblemBody;
      const fromServer = body.errors ? mapFieldErrors(body.errors, copy) : {};
      setFieldErrors(fromServer);
      setStatus('error');
      if (Object.keys(fromServer).length === 0) {
        setErrorMsg(messageForCode(body.code, copy, copy.errorMessage));
      }
      resetTurnstile();
    } catch {
      setStatus('error');
      setErrorMsg(copy.networkError);
      resetTurnstile();
    }
  };

  if (status === 'success') {
    return (
      <div className="py-10 text-center space-y-4">
        <div className="w-14 h-14 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-ink">{copy.successHeading}</h2>
        <p className="text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
          {copy.successMessage}
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-ink/20 text-ink hover:border-teal hover:text-teal text-sm min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            {copy.againLabel}
          </button>
        </div>
      </div>
    );
  }

  const orderedFieldErrors = FIELD_ORDER.filter((id) => fieldErrors[id]);
  const showSummary = status === 'error' && (orderedFieldErrors.length > 0 || Boolean(errorMsg));

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {!turnstileSiteKey && (
        <div
          role="status"
          className="p-4 bg-coral/10 border border-coral/30 rounded-xl text-coral text-sm"
        >
          {copy.missingTurnstile}
        </div>
      )}

      {showSummary && (
        <div
          ref={summaryRef}
          id="contact-error-summary"
          role="alert"
          tabIndex={-1}
          className="p-4 bg-coral/10 border border-coral/30 rounded-xl text-coral text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-coral"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-2">
              <p className="font-medium text-ink">{copy.errorSummary}</p>
              {errorMsg && <p>{errorMsg}</p>}
              {orderedFieldErrors.length > 0 && (
                <ul className="list-disc pl-5 space-y-1">
                  {orderedFieldErrors.map((id) => (
                    <li key={id}>
                      <a href={`#${id}`} className="underline hover:no-underline text-ink">
                        {fieldErrors[id]}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <span>Leave blank</span>
        <input
          type="text"
          name="hp_confirm"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>

      <Field
        id="name"
        name="name"
        label={copy.nameLabel}
        placeholder={copy.namePlaceholder}
        requiredMark
        autoComplete="name"
        maxLength={120}
        error={fieldErrors.name}
      />
      <Field
        id="email"
        name="email"
        type="email"
        label={copy.emailLabel}
        placeholder={copy.emailPlaceholder}
        requiredMark
        autoComplete="email"
        maxLength={200}
        error={fieldErrors.email}
      />
      <Field
        id="company"
        name="company"
        label={copy.companyLabel}
        placeholder={copy.companyPlaceholder}
        autoComplete="organization"
        maxLength={200}
        error={fieldErrors.company}
      />

      <div className="space-y-1.5">
        <label
          htmlFor="problem"
          className="block text-xs font-mono text-ink font-bold uppercase tracking-wider"
        >
          {copy.problemLabel} <span className="text-coral">*</span>
        </label>
        <textarea
          id="problem"
          name="problem"
          rows={5}
          maxLength={4000}
          placeholder={copy.problemPlaceholder}
          aria-invalid={fieldErrors.problem ? true : undefined}
          aria-describedby={fieldErrors.problem ? 'problem-error' : undefined}
          className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-ink/20 bg-canvas/30 text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:bg-white transition-colors resize-y aria-[invalid=true]:border-coral"
        />
        {fieldErrors.problem && (
          <p id="problem-error" className="text-sm text-coral">
            {fieldErrors.problem}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="timeline"
          className="block text-xs font-mono text-ink font-bold uppercase tracking-wider"
        >
          {copy.timelineLabel}
        </label>
        <select
          id="timeline"
          name="timeline"
          defaultValue="1_3m"
          className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-ink/20 bg-canvas/30 text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:bg-white transition-colors"
        >
          {TIMELINE_IDS.map((id, i) => (
            <option key={id} value={id}>
              {copy.timelineOptions[i] ?? id}
            </option>
          ))}
        </select>
      </div>

      {turnstileSiteKey && (
        <div>
          <div ref={turnstileHost} />
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 w-full min-h-[44px] px-7 py-3.5 rounded-lg bg-teal text-white text-base font-medium hover:bg-teal-deep active:bg-teal-deep shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>{copy.submitting}</span>
            </>
          ) : (
            <>
              <span>{copy.submitButton}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  requiredMark?: boolean;
  autoComplete?: string;
  maxLength?: number;
  error?: string;
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = 'text',
  requiredMark = false,
  autoComplete,
  maxLength = 200,
  error,
}: FieldProps): React.ReactElement {
  const errorId = `${id}-error`;
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-mono text-ink font-bold uppercase tracking-wider"
      >
        {label} {requiredMark && <span className="text-coral">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-ink/20 bg-canvas/30 text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:bg-white transition-colors aria-[invalid=true]:border-coral"
      />
      {error && (
        <p id={errorId} className="text-sm text-coral">
          {error}
        </p>
      )}
    </div>
  );
}
