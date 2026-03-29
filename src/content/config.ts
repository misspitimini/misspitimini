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
    isLargeCard: z.boolean().optional(), // To identify the large card
    buttonText: z.string().optional(), // For the button on the large card
  }),
});

// Schema for the workshops
const workshopsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    img_slug: z.string(),
    imgAlt: z.string(),
    title: z.string(),
    description: z.string(),
    link: z.string(),
  }),
});

// Schema for the next workshop card
const nextWorkshopCollection = defineCollection({
  type: 'data',
  schema: z.object({
    imgAlt: z.string(),
    date: z.string(),
    title4: z.string(),
    title5: z.string(),
    description: z.string(),
    image: z.string(),
  }),
});

// Export collections
export const collections = {
  homecards: homeCardsCollection,
  workshops: workshopsCollection,
  'next-workshop': nextWorkshopCollection,
};