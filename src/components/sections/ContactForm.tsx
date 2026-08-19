import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

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
  directEmailText: string;
  requiredLabel: string;
  againLabel: string;
  successHeading: string;
}

interface Props {
  lang: 'fr' | 'en';
  turnstileSiteKey?: string;
  copy: Copy;
}

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

export default function ContactForm({ lang, turnstileSiteKey, copy }: Props): React.ReactElement {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [token, setToken] = useState('');
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileHost = useRef<HTMLDivElement | null>(null);

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

  const resetTurnstile = () => {
    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
      setToken('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      company: String(data.get('company') ?? '').trim(),
      problem: String(data.get('problem') ?? '').trim(),
      timeline: String(data.get('timeline') ?? '').trim(),
      lang,
      website: String(data.get('website') ?? ''),
      turnstileToken: token,
    };

    if (!payload.name || !payload.email || payload.problem.length < 20) {
      setStatus('error');
      setErrorMsg(copy.errorMessage);
      return;
    }
    if (!turnstileSiteKey) {
      // Local dev without Turnstile: allow, server will still validate.
    } else if (!token) {
      setStatus('error');
      setErrorMsg(
        lang === 'fr'
          ? 'Merci de valider le contrôle anti-spam.'
          : 'Please complete the anti-spam check.'
      );
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        resetTurnstile();
        return;
      }

      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus('error');
      setErrorMsg(
        body.error === 'turnstile_failed'
          ? lang === 'fr'
            ? 'Le contrôle anti-spam a échoué. Réessayez.'
            : 'Anti-spam check failed. Please retry.'
          : body.error === 'rate_limited'
            ? lang === 'fr'
              ? 'Trop de tentatives. Réessayez dans quelques minutes.'
              : 'Too many attempts. Please retry in a few minutes.'
            : copy.errorMessage
      );
      resetTurnstile();
    } catch {
      setStatus('error');
      setErrorMsg(
        lang === 'fr'
          ? 'Impossible de contacter le serveur. Vérifiez votre connexion.'
          : 'Could not reach the server. Please check your connection.'
      );
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-ink/20 text-ink hover:border-teal hover:text-teal text-sm min-h-[36px]"
          >
            {copy.againLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {status === 'error' && (
        <div
          role="alert"
          className="p-4 bg-coral/10 border border-coral/30 rounded-xl flex items-start gap-3 text-[#C84635] text-sm"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{errorMsg}</span>
        </div>
      )}

      <label className="hidden" aria-hidden="true">
        <span>Do not fill</span>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>

      <Field
        id="name"
        name="name"
        label={copy.nameLabel}
        placeholder={copy.namePlaceholder}
        required
        requiredLabel={copy.requiredLabel}
        autoComplete="name"
      />
      <Field
        id="email"
        name="email"
        type="email"
        label={copy.emailLabel}
        placeholder={copy.emailPlaceholder}
        required
        requiredLabel={copy.requiredLabel}
        autoComplete="email"
      />
      <Field
        id="company"
        name="company"
        label={copy.companyLabel}
        placeholder={copy.companyPlaceholder}
        autoComplete="organization"
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
          minLength={20}
          maxLength={4000}
          placeholder={copy.problemPlaceholder}
          required
          className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-canvas/30 text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:bg-white transition-colors resize-y"
        />
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
          defaultValue={copy.timelineOptions[1]}
          className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-canvas/30 text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:bg-white transition-colors"
        >
          {copy.timelineOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
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
  required?: boolean;
  requiredLabel?: string;
  autoComplete?: string;
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
  autoComplete,
}: FieldProps): React.ReactElement {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-mono text-ink font-bold uppercase tracking-wider"
      >
        {label} {required && <span className="text-coral">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        maxLength={type === 'email' ? 200 : 200}
        className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-canvas/30 text-ink text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:bg-white transition-colors"
      />
    </div>
  );
}
