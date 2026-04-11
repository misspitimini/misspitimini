
import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    heroImage: z.string().optional(),
  }),
});

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

// Schema for the workshops
const workshopsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    image: z.string(),
    imgAlt: z.string(),
    date: z.string(),
    title4: z.string(),
    title5: z.string(),
    description: z.string(),
  }),
});

// Schema for the next workshop card
const nextWorkshopCollection = defineCollection({
  type: 'data',
  schema: z.object({
    image: z.string(),
    imgAlt: z.string(),
    date: z.string(),
    title4: z.string(),
    title5: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'homecards': homeCardsCollection,
  'workshops': workshopsCollection,
  'next-workshop': nextWorkshopCollection,
};
