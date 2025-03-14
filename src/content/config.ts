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

const autoAvaliaCustomFormsCollection = defineCollection({
  loader: file("src/content/auto-avalia-custom-forms.json"),
  schema: z.object({
    idiomaI18nId: z.union([z.literal("en"), z.literal("pt"), z.literal("es"), z.literal("fr"), z.literal("it"), z.literal("ja"), z.literal("de")]),
    cursoI18nId: z.string(),
    nivel: z.union([z.literal("A1"), z.literal("A2"), z.literal("B1"), z.literal("B2"), z.literal("C1"), z.literal("C2")]),
    perguntas: z.array(z.object({
      categoria: z.union([z.literal("understanding"), z.literal("speaking"), z.literal("writing")]),
      subcategoria: z.union([z.literal("listening"), z.literal("reading"), z.literal("spoken_interaction"), z.literal("spoken_production"), z.null()]),
      perguntaI18nId: z.string(),
    })),
  }),
});

export const collections = {
  permalinks: permalinksCollection,
  autoAvaliaCustomForms: autoAvaliaCustomFormsCollection
};
