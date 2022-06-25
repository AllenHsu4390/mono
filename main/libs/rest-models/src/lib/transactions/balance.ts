import { z } from 'zod';

export const BalanceResponseSchema = z.object({
  sum: z.number(),
});

export type BalanceResponse = z.infer<typeof BalanceResponseSchema>;
