import { z } from 'zod';

export const CreatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  desc: z.string(),
  avatarUrl: z.string(),
});

export const CreatorResponseSchema = CreatorSchema.merge(
  z.object({
    links: z.object({
      assets: z.string(),
      newAsset: z.string().optional(),
      gallery: z.string(),
    }),
  })
);

export type CreatorResponse = z.infer<typeof CreatorResponseSchema>;
export type Creator = z.infer<typeof CreatorSchema>;
