import { z } from 'zod';

export const SessionResponseSchema = z.object({
  isLoggedIn: z.boolean(),
  links: z.object({
    session: z.string().optional(),
    signup: z.string().optional(),
  }),
});

export type SessionResponse = z.infer<typeof SessionResponseSchema>;
