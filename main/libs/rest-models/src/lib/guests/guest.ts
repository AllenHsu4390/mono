import { z } from 'zod';

export const GuestResponseSchema = z.object({
  links: z.object({
    loginPage: z.string(),
    login: z.string(),
    logout: z.string(),
    signup: z.string(),
    categories: z.string(),
  }),
});

export type GuestResponse = z.infer<typeof GuestResponseSchema>;
