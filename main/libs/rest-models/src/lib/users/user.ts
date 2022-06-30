import { z } from 'zod';

export const UserSchema = z.object({
  avatarUrl: z.string(),
  email: z.string().email(),
  name: z.string(),
  creatorId: z.string(),
  hasDailyTopUp: z.boolean(),
});

export const UserResponseSchema = UserSchema.merge(
  z.object({
    links: z.object({
      editAccount: z.string(),
      balance: z.string(),
      gallery: z.string(),
      me: z.string(),
      creator: z.string(),
      logoutPage: z.string(),
      dailyTopUp: z.string().optional(),
    }),
  })
);

export type User = z.infer<typeof UserSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
