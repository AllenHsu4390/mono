import { z } from 'zod';

export const CategoriesResponseSchema = z.object({
  categories: z.array(z.string()),
});

export type CategoriesResponse = z.infer<typeof CategoriesResponseSchema>;
