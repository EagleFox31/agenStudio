// `z` vient d'`astro:content`, pas du paquet `zod` : Astro 7 embarque zod v4 en
// interne. Importer zod v3 (dépendance du projet, utilisée par contact-schema)
// donnait deux instances distinctes — le Content Layer ne savait plus lire le
// schéma et ne générait plus les types des collections.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
  // `value` est bilingue comme `label` : un chiffre s'accompagne presque
  // toujours d'une unité ou d'une mention qui se traduit. En monolingue, la
  // valeur fuyait d'une langue à l'autre sur la même page.
  metrics: z
    .array(
      z.object({
        label: bilingual,
        value: bilingual,
      })
    )
    .default([]),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: projectSchema,
});

export const collections = { projects };

// Pas de `z.infer` ici : `z` importé d'`astro:content` est une valeur, pas un
// namespace de types. Pour typer les données d'un projet, utiliser la forme
// idiomatique Astro, déjà employée dans les composants :
//   import type { CollectionEntry } from 'astro:content';
//   CollectionEntry<'projects'>['data']
