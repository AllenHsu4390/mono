import { z } from 'zod';
import { PaginationSchema } from '../pagination';
import { AssetSchema } from './asset';

export const AssetsSchema = z.object({
  assets: z.array(AssetSchema),
  pagination: PaginationSchema,
});

export const AssetsResponseSchema = AssetsSchema.merge(
  z.object({
    links: z.object({
      next: z.string().optional(),
      assets: z.array(z.string()),
    }),
  })
);

export type Assets = z.infer<typeof AssetsSchema>;
export type AssetsResponse = z.infer<typeof AssetsResponseSchema>;
