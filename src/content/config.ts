import { z, defineCollection } from 'astro:content';

// Schema for the home page cards
const homeCardsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    img_slug: z.string(),
    imgAlt: z.string(),
    title: z.string(),
    description: z.string(),
    link: z.string(),
    isLargeCard: z.boolean().optional(),
    buttonText: z.string().optional()
  }),
});

export const collections = {
  'homecards': homeCardsCollection,
};
