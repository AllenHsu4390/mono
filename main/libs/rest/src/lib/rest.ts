import {
  AssetsResponseSchema,
  BalanceResponseSchema,
  CreatorResponseSchema,
  DailyTopUpResponseSchema,
  GuestResponseSchema,
  SessionResponseSchema,
  User,
} from '@main/rest-models';
import { z } from 'zod';
import { deleteAsset } from './assets/delete-asset';
import { getAsset } from './assets/get-asset';
import { getAssets } from './assets/get-assets';
import { getTopAssets } from './assets/get-top-assets';
import { saveAsset } from './assets/save-asset';
import { getCreator } from './creators/get-creator';
import { saveDailyTopUp } from './daily-top-up/save-daily-top-up';
import { getGuest } from './guests/get-guest';
import { getLikesCount } from './likes/get-likes-count';
import { saveLike } from './likes/save-like';
import { createSession } from './sessions/create-session';
import { deleteSession } from './sessions/delete-session';
import { getSession } from './sessions/get-session';
import { updateSession } from './sessions/update-session';
import { getBalance } from './transactions/get-balance';
import { getUser } from './users/get-user';
import { getUserIdByEmail } from './users/get-user-id-by-email';
import { saveUser } from './users/save-user';

export const rest = {
  // users/id?email=:email GET
  // users POST
  // users/:id
  // users/:id/balance
  // users/:id/dailyTopUp POST
  users: {
    param: (id: string) => ({
      get: async () => getUser(id),
      dailyTopUp: {
        post: async () => DailyTopUpResponseSchema.parse(saveDailyTopUp(id)),
      },
      balance: {
        get: async () => BalanceResponseSchema.parse(getBalance(id)),
      },
    }),
    id: {
      get: async ({ email }: { email: string }) =>
        z.string().parse(getUserIdByEmail(email)),
    },
    post: async ({ email }: { email: string }) =>
      z.string().parse(saveUser({ email })),
  },

  // creators/:id
  // creators/:id/assets?pageId=:pageId
  creators: {
    param: (id: string) => ({
      get: async ({ user }: { user?: User | null }) =>
        CreatorResponseSchema.parse(getCreator(id, user)),
      assets: {
        get: async ({ pageId }: { pageId: string }) =>
          AssetsResponseSchema.parse(getAssets(id, pageId)),
      },
    }),
  },

  // sessions/:id POST
  // sessions/:id
  // sessions/:id DELETE
  // session?userId=:userId POST
  sessions: {
    param: (id: string) => ({
      get: async () => SessionResponseSchema.parse(getSession(id)),
      post: async () => updateSession(id),
      delete: async () => deleteSession(id),
    }),
    post: async ({ userId }: { userId: string }) => createSession(userId),
  },
  // guests/start
  guests: {
    start: {
      get: () => GuestResponseSchema.parse(getGuest()),
    },
  },

  // assets/:id
  // assets/:id DELETE
  // assets/:id/likes/count
  // assets/:id/likes POST
  // assets/top?pageId=:pageId
  // assets?creatorId=:creatorId { imageData } POST
  assets: {
    param: (id: string) => ({
      get: async ({ user }: { user?: User }) => getAsset(id, user),
      delete: async ({ creatorId }: { creatorId: string }) =>
        deleteAsset(id, creatorId),
      likes: {
        count: {
          get: async () => getLikesCount(id),
        },
        post: async ({ userId }: { userId: string }) =>
          saveLike({
            userId,
            assetId: id,
          }),
      },
    }),
    top: {
      get: async ({ pageId }: { pageId: string }) =>
        AssetsResponseSchema.parse(getTopAssets(pageId)),
    },
    post: async ({
      creatorId,
      imageData,
    }: {
      creatorId: string;
      imageData: string;
    }) => saveAsset(creatorId, imageData),
  },
};
