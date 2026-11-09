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
    quality: z.string().optional(),
    buttonText: z.string().optional()
  }),
});

// Schema for the workshops
const nextWorkshopCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    imgSrc: image(),
    imgAlt: z.string(),
    pubDate: z.string(),
    dateText: z.string(),
    hour: z.string(),
    title: z.string(),
    sumary: z.object({
      duration: z.string(),
      materials: z.string(),
      experiences: z.string(),
      price: z.string(),
      location: z.string(),
      capacity: z.string(),
    }),
    pompadour: z.string(),
    tags: z.array(z.string()),
    isDraft: z.boolean().optional(),
  }),
});