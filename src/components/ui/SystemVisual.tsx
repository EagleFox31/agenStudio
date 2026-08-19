import * as React from 'react';
import { useState } from 'react';
import { Activity, Database, GitMerge, Cpu, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

interface Props {
  lang?: 'fr' | 'en';
}

export default function SystemVisual({ lang = 'fr' }: Props): React.ReactElement {
  const [activeNode, setActiveNode] = useState<number>(1);

  const nodes = [
    {
      id: 1,
      label: lang === 'fr' ? 'Fichiers & ERP' : 'Files & ERP',
      status: lang === 'fr' ? 'SYNCHRONISÉ' : 'SYNCED',
      Icon: Database,
      color: '#007C83',
    },
    {
      id: 2,
      label: lang === 'fr' ? 'Moteur de règles' : 'Rules Engine',
      status: lang === 'fr' ? 'ACTIF' : 'ACTIVE',
      Icon: Cpu,
      color: '#B5175B',
    },
    {
      id: 3,
      label: lang === 'fr' ? 'Passerelle API' : 'API Gateway',
      status: lang === 'fr' ? 'SÉCURISÉ' : 'SECURED',
      Icon: GitMerge,
      color: '#075C62',
    },
    {
      id: 4,
      label: lang === 'fr' ? 'Flux décisionnel' : 'Decision Flow',
      status: lang === 'fr' ? 'OPÉRATIONNEL' : 'OPERATIONAL',
      Icon: Activity,
      color: '#D2A43B',
    },
  ];

  const busLabel = lang === 'fr' ? 'FLUX EN DIRECT' : 'LIVE FLOW';
  const rulesLabel = lang === 'fr' ? 'Règles métier :' : 'Business rules:';
  const conformStatus = lang === 'fr' ? 'CONFORMES (0 ERREUR)' : 'COMPLIANT (0 ERRORS)';
  const uptimeLabel = lang === 'fr' ? 'DISPONIBILITÉ : 99.98%' : 'UPTIME: 99.98%';
  const securityLabel = lang === 'fr' ? 'GARANTIE SÉCURITÉ' : 'SECURITY GUARANTEE';

  return (
    <div className="relative w-full rounded-2xl bg-ink text-white p-6 sm:p-8 border border-teal/30 shadow-2xl overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-between">
      <div className="absolute inset-0 bg-dots-pattern opacity-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-teal/10 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-coral" />
            <span className="w-2.5 h-2.5 rounded-full bg-gold" />
            <span className="w-2.5 h-2.5 rounded-full bg-teal" />
          </div>
          <span className="font-mono text-xs text-ink-light uppercase tracking-wider">
            AGENSTUDIO / SYSTEM_V1
          </span>
        </div>
        <div className="flex items-center gap-2 bg-teal/20 border border-teal/40 px-2.5 py-1 rounded-full text-xs font-mono text-teal">
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse-soft motion-reduce:animate-none" aria-hidden="true" />
          <span>{busLabel}</span>
        </div>
      </div>

      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
        {nodes.map((node) => {
          const isActive = activeNode === node.id;
          const Icon = node.Icon;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveNode(node.id)}
              aria-pressed={isActive}
              className={`p-4 rounded-xl text-left border transition-all duration-200 min-h-[80px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                isActive
                  ? 'bg-white/10 border-teal shadow-lg'
                  : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${node.color}25`, color: node.color }}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/80">
                  {node.status}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-sm text-white">{node.label}</h3>
              <p className="font-mono text-[11px] text-ink-light mt-1">
                {lang === 'fr' ? 'LATENCE : 12 ms' : 'LATENCY: 12ms'} · <span className="text-teal">100% PAREFEU</span>
              </p>
            </button>
          );
        })}
      </div>

      <div className="bg-black/30 rounded-xl p-3 sm:p-4 border border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3 text-xs">
          <ShieldCheck className="w-4 h-4 text-teal" aria-hidden="true" />
          <span className="font-mono text-ink-light">{rulesLabel}</span>
          <span className="font-mono text-white font-medium">{conformStatus}</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-white/90">
            <Zap className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
            <span>{uptimeLabel}</span>
          </span>
          <span className="flex items-center gap-1.5 text-teal">
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{securityLabel}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
