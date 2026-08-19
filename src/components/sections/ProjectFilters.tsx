import * as React from 'react';
import { useMemo, useState } from 'react';

type ProjectType = 'client' | 'internal' | 'rd' | 'concept';

interface ProjectView {
  slug: string;
  type: ProjectType;
  href: string;
  sector: string;
  typeLabel: string;
  title: string;
  subtitle: string;
  friction: string;
  stack: string[];
  statusLabel: string;
}

interface Props {
  lang: 'fr' | 'en';
  allLabel: string;
  filterLabel: string;
  problemLabel: string;
  viewLabel: string;
  projects: ProjectView[];
  typeLabels: Record<ProjectType, string>;
}

const TYPES: ProjectType[] = ['client', 'internal', 'rd', 'concept'];

export default function ProjectFilters({
  lang,
  allLabel,
  filterLabel,
  problemLabel,
  viewLabel,
  projects,
  typeLabels,
}: Props): React.ReactElement {
  const [filter, setFilter] = useState<ProjectType | 'all'>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.type === filter)),
    [filter, projects]
  );

  const counts = useMemo(() => {
    const c: Record<ProjectType, number> = { client: 0, internal: 0, rd: 0, concept: 0 };
    projects.forEach((p) => (c[p.type] += 1));
    return c;
  }, [projects]);

  return (
    <>
      <div
        className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-ink/10"
        role="toolbar"
        aria-label={filterLabel}
      >
        <span className="flex items-center gap-2 text-xs font-mono text-ink-light mr-2">
          <span aria-hidden="true">▾</span>
          <span className="uppercase">{filterLabel}</span>
        </span>

        <button
          type="button"
          onClick={() => setFilter('all')}
          aria-pressed={filter === 'all'}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
            filter === 'all'
              ? 'bg-ink text-white font-semibold'
              : 'bg-canvas text-ink hover:bg-ink/10'
          }`}
        >
          {allLabel} ({projects.length})
        </button>

        {TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setFilter(type)}
            aria-pressed={filter === type}
            disabled={counts[type] === 0}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors min-h-[36px] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
              filter === type
                ? 'bg-teal text-white font-semibold'
                : 'bg-canvas text-ink hover:bg-ink/10'
            }`}
          >
            {typeLabels[type]} ({counts[type]})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project) => (
          <article
            key={project.slug}
            className="relative rounded-xl p-6 sm:p-8 overflow-hidden bg-white text-ink border border-ink/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-teal/40 motion-reduce:hover:translate-y-0 h-full flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider uppercase bg-ink/10 text-ink border border-ink/20">
                  {project.sector}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider uppercase border ${badgeClass(project.type)}`}
                >
                  {project.typeLabel}
                </span>
              </div>

              <h2 className="font-heading font-bold text-xl text-ink">{project.title}</h2>
              <p className="text-xs text-ink-muted leading-relaxed">{project.subtitle}</p>

              <div className="p-3 bg-canvas rounded-lg border border-ink/10">
                <h3 className="font-mono text-[10px] text-ink-light uppercase font-bold">
                  {problemLabel}
                </h3>
                <p className="text-xs text-ink mt-0.5 line-clamp-3">{project.friction}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-ink/5 text-ink text-[10px] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between">
              <span className="text-xs font-mono text-teal font-medium">
                {project.statusLabel}
              </span>
              <a
                href={project.href}
                className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
              >
                <span>{viewLabel}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 p-6 rounded-xl border border-dashed border-ink/20 text-sm text-ink-muted text-center">
          {lang === 'fr'
            ? 'Aucun projet ne correspond à ce filtre pour le moment.'
            : 'No project matches this filter yet.'}
        </p>
      )}
    </>
  );
}

function badgeClass(type: ProjectType): string {
  switch (type) {
    case 'internal':
      return 'bg-teal/10 text-teal border-teal/20';
    case 'rd':
      return 'bg-magenta/10 text-magenta border-magenta/20';
    case 'client':
      return 'bg-bordeaux/10 text-bordeaux border-bordeaux/25 font-semibold';
    case 'concept':
    default:
      return 'bg-gold/15 text-[#9E7519] border-gold/30';
  }
}
