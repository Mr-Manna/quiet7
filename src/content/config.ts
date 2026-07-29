import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Case studies. Add a project by dropping a new .md file into
// src/content/work/ with the frontmatter fields below.
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    category: z.string(), // e.g. "Brand & Web"
    year: z.union([z.number(), z.string()]),
    summary: z.string(), // one-line teaser for cards
    // Cover + gallery images live in /public (string paths) so they are
    // trivial to swap. Replace with real photography/renders.
    cover: z.string(),
    accent: z.string().optional(), // per-project accent for the cover
    images: z.array(z.string()).default([]),
    services: z.array(z.string()).default([]),
    role: z.string().optional(),
    results: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

// Journal — writing on design, art & visual communication. Add an article
// by dropping a new .md file into src/content/journal/.
const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    category: z.string(), // e.g. "Typography", "Colour", "Art"
    excerpt: z.string(),
    date: z.coerce.date(),
    readTime: z.string(), // e.g. "5 min"
    author: z.string().default('quiet seven'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { work, journal };
