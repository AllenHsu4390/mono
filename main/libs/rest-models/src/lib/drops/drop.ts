import { z } from 'zod';

export const DropResponseSchema = z.object({
  isDropped: z.boolean(),
  assetId: z.string(),
});

export type DropResponse = z.infer<typeof DropResponseSchema>;
