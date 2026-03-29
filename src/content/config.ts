// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define a `type` and `schema` for each collection
const workshopsCollection = defineCollection({
  type: 'data', // can be 'data' or 'content'
  schema: z.object({
    img_slug: z.string(),
    imgAlt: z.string(),
    title: z.string(),
    description: z.string(),
    link: z.string(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  workshops: workshopsCollection,
};
