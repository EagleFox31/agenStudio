import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const bilingual = z.object({ fr: z.string(), en: z.string() });

const projectSchema = z.object({
  slug: z.string(),
  type: z.enum(['client', 'internal', 'rd', 'concept']),
  order: z.number().default(100),
  featured: z.boolean().default(false),
  title: bilingual,
  subtitle: bilingual,
  sector: bilingual,
  context: bilingual,
  friction: bilingual,
  decision: bilingual,
  solution: bilingual,
  stack: z.array(z.string()),
  statusLabel: bilingual,
  metrics: z
    .array(
      z.object({
        label: bilingual,
        value: z.string(),
      })
    )
    .default([]),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: projectSchema,
});

export const collections = { projects };
export type ProjectFrontmatter = z.infer<typeof projectSchema>;
