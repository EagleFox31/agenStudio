import * as React from 'react';
import { useState } from 'react';
import { Compass, Monitor, Zap } from 'lucide-react';
import SystemVisual from '../ui/SystemVisual';

interface Props {
  lang: 'fr' | 'en';
}

type Tab = 'system' | 'preview' | 'vision';

export default function HeroVisual({ lang }: Props): React.ReactElement {
  const [tab, setTab] = useState<Tab>('system');

  const labels =
    lang === 'fr'
      ? { system: 'Flux Live', preview: 'Interface', vision: 'Vision Studio' }
      : { system: 'Live Flow', preview: 'Interface', vision: 'Studio Vision' };

  return (
    <div className="space-y-3">
      <div
        role="tablist"
        aria-label={lang === 'fr' ? 'Aperçus du système' : 'System previews'}
        className="flex items-center justify-between p-1.5 bg-ink/10 rounded-xl border border-ink/10"
      >
        <TabBtn active={tab === 'system'} onClick={() => setTab('system')} Icon={Zap} color="teal">
          {labels.system}
        </TabBtn>
        <TabBtn active={tab === 'preview'} onClick={() => setTab('preview')} Icon={Monitor} color="ink">
          {labels.preview}
        </TabBtn>
        <TabBtn active={tab === 'vision'} onClick={() => setTab('vision')} Icon={Compass} color="bordeaux">
          {labels.vision}
        </TabBtn>
      </div>

      <div className="min-h-[380px] sm:min-h-[440px]">
        {tab === 'system' && <SystemVisual lang={lang} />}
        {tab === 'preview' && <PreviewMock lang={lang} />}
        {tab === 'vision' && <VisionCard lang={lang} />}
      </div>
    </div>
  );
}

interface TabBtnProps {
  active: boolean;
  onClick: () => void;
  Icon: typeof Compass;
  color: 'teal' | 'ink' | 'bordeaux';
  children: React.ReactNode;
}

function TabBtn({ active, onClick, Icon, color, children }: TabBtnProps): React.ReactElement {
  const activeClass =
    color === 'teal'
      ? 'bg-teal text-white shadow-sm font-semibold'
      : color === 'ink'
        ? 'bg-ink text-white shadow-sm font-semibold'
        : 'bg-bordeaux text-white shadow-sm font-semibold';
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-mono font-medium transition-all min-h-[36px] flex items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
        active ? activeClass : 'text-ink/70 hover:text-ink'
      }`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </button>
  );
}

function PreviewMock({ lang }: { lang: 'fr' | 'en' }): React.ReactElement {
  const label =
    lang === 'fr' ? 'APPLICATION MÉTIER SUR-MESURE' : 'CUSTOM BUSINESS APPLICATION';
  return (
    <div className="relative rounded-2xl overflow-hidden border border-ink/15 shadow-2xl bg-white h-full min-h-[380px] sm:min-h-[440px]">
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3 mb-4">
          <div className="flex items-center gap-2 font-mono text-[11px] text-ink/60">
            <span className="w-2 h-2 rounded-full bg-teal" aria-hidden="true" />
            <span>{label}</span>
          </div>
          <span className="font-mono text-[10px] text-bordeaux">100% RESPONSIVE</span>
        </div>
        <div className="grid grid-cols-3 gap-3 flex-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-ink/10 bg-canvas p-3 flex flex-col justify-between"
            >
              <div className="h-2 rounded bg-ink/10 w-3/4" />
              <div className="h-6 rounded bg-teal/15 w-full" />
              <div className="h-2 rounded bg-ink/10 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisionCard({ lang }: { lang: 'fr' | 'en' }): React.ReactElement {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-teal/30 bg-ink text-white h-full min-h-[380px] sm:min-h-[440px] p-6 sm:p-8 flex flex-col justify-between">
      <div className="absolute inset-0 bg-dots-pattern opacity-10 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 space-y-3">
        <span className="font-mono text-xs text-teal tracking-widest uppercase">
          {lang === 'fr' ? 'Direction Artistique' : 'Art Direction'}
        </span>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold leading-tight">
          {lang === 'fr'
            ? 'Afrofuturisme systémique et lumineux.'
            : 'Systemic, luminous afrofuturism.'}
        </h3>
        <p className="text-sm text-ink-light leading-relaxed max-w-md">
          {lang === 'fr'
            ? "L'identité africaine apparaît dans la géométrie, le rythme et l'intelligence des systèmes — jamais dans un décor folklorique."
            : 'African identity appears in geometry, rhythm, and system intelligence — never as folklore decoration.'}
        </p>
      </div>
      <div className="relative z-10 flex items-center gap-3 pt-6 border-t border-white/10">
        <span className="w-2 h-2 rounded-full bg-gold animate-pulse-soft motion-reduce:animate-none" aria-hidden="true" />
        <span className="font-mono text-[11px] text-gold uppercase tracking-wider">
          {lang === 'fr' ? 'Ria — Cameroun & Europe' : 'Ria — Cameroon & Europe'}
        </span>
      </div>
    </div>
  );
}
