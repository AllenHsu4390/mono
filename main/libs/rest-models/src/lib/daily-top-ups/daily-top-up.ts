import { z } from 'zod';

export const DailyTopUpSchema = z.object({
  hasToppedUp: z.boolean(),
});

export const DailyTopUpResponseSchema = DailyTopUpSchema;

export type DailyTopUp = z.infer<typeof DailyTopUpSchema>;
export type DailyTopUpResponse = z.infer<typeof DailyTopUpResponseSchema>;
