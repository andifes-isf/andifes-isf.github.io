import { defineCollection, z } from "astro:content";
import { file } from 'astro/loaders';

const permalinksCollection = defineCollection({
  loader: file("src/content/permalinks.json"),
  schema: z.object({
    permanent: z.boolean().default(false),
    slug: z.string(),
    target: z.string(),
  }),
});

export const collections = {
  permalinks: permalinksCollection,
};
