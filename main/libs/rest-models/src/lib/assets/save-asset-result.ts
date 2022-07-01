import { z } from 'zod';

export const SaveAssetResultSchema = z.object({
  id: z.string(),
});

export const SaveAssetResultResponseSchema = SaveAssetResultSchema.merge(
  z.object({
    links: z.object({
      asset: z.string(),
    }),
  })
);

export type SaveAssetResult = z.infer<typeof SaveAssetResultSchema>;
export type SaveAssetResultResponse = z.infer<
  typeof SaveAssetResultResponseSchema
>;
