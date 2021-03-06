import { z } from 'zod';

export const PaginationSchema = z.object({
  next: z.string().optional(),
  prev: z.string().optional(),
  total: z.number(),
});

export type Pagination = z.infer<typeof PaginationSchema>;
