import { z } from 'zod';
import { CreatorSchema } from '../creators/creator';

export const AssetSchema = z.object({
  id: z.string(),
  src: z.string(),
  creator: CreatorSchema,
});

export const AssetResponseSchema = AssetSchema.merge(
  z.object({
    links: z.object({
      like: z.string().optional(),
      delete: z.string().optional(),
      likeCount: z.string(),
      creator: z.string(),
    }),
  })
);

export type Asset = z.infer<typeof AssetSchema>;
export type AssetResponse = z.infer<typeof AssetResponseSchema>;
