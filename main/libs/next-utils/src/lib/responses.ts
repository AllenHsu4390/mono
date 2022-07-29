import { environment } from '@main/environment';
import {
  AssetResponseSchema,
  AssetsResponse,
  AssetsResponseSchema,
  CategoriesResponse,
  CreatorResponseSchema,
  GuestResponse,
  GuestResponseSchema,
  User,
  UserResponseSchema,
} from '@main/rest-models';

export const getUserResponse = async (userId: string) => {
  if (!userId) {
    throw new Error('Invalid Auth');
  }

  const { cache, db } = environment;

  const user = await cache.user.get(userId, async () => {
    return await db.user.get(userId);
  });

  return UserResponseSchema.parse({
    ...user,
    links: {
      editAccount: '/users/edit',
      balance: '/api/transactions/balance',
      gallery: `/galleries/${user.creatorId}`,
      creator: `/api/creators/${user.creatorId}`,
      logoutPage: '/users/logout',
      me: '/api/users/me',
      ...(user.hasDailyTopUp
        ? {
            dailyTopUp: '/api/transactions/mint',
          }
        : {}),
    },
  });
};

export const getCreatorResponse = async (
  creatorId: string,
  user: User | null
) => {
  const { db } = environment;
  const creator = await db.creator.get(creatorId);

  return CreatorResponseSchema.parse({
    ...creator,
    links: {
      assets: `/api/assets?creatorId=${creatorId}`,
      gallery: `/galleries/${creatorId}`,
      ...(user && user.creatorId === creatorId
        ? {
            newAsset: `/api/assets`,
          }
        : {}),
    },
  });
};

export const getGuestResponse = (): GuestResponse => {
  return GuestResponseSchema.parse({
    links: {
      loginPage: '/users/login',
      login: '/api/users/login',
      logout: '/api/users/logout',
      signup: '/api/users',
      categories: '/api/categories',
    },
  });
};

export const getCategoriesResponse = (): CategoriesResponse => {
  return {
    categories: [
      'misc',
      'pets',
      'cats',
      'dogs',
      'nightlife',
      'nature',
      'games',
      'basketball',
      'soccer',
      'sports',
      'cooking',
      'cafe',
      'dessert',
      'restaurant',
      'relax',
    ],
  };
};

export const getAssetsResponse = async (
  creatorId: string,
  cursorId?: string
) => {
  const { db } = environment;
  const { assets, pagination } = await db.assets.get(creatorId, cursorId);

  return AssetsResponseSchema.parse({
    assets,
    pagination,
    links: {
      assets: assets.map((a) => `/assets/${a.id}`),
      ...(pagination.next
        ? {
            next: `/api/assets?creatorId=${creatorId}&pageId=${pagination.next}`,
          }
        : {}),
    },
  });
};

export const getTopAssetsResponse = async (
  pageId: string
): Promise<AssetsResponse> => {
  const { db } = environment;
  const { assets, pagination } = await db.topAssets.get(pageId);

  return AssetsResponseSchema.parse({
    assets,
    pagination,
    links: {
      assets: assets.map((a) => `/assets/${a.id}`),
      ...(pagination.next
        ? {
            next: `/api/assets/top?pageId=${pagination.next}`,
          }
        : {}),
    },
  });
};

export const getAssetResponse = async (id: string, user: User | null) => {
  const { db } = environment;
  const asset = await db.asset.get(id);
  const isLogin = !!user;
  const isOwnAsset = isLogin && asset.creator.id === user.creatorId;

  return AssetResponseSchema.parse({
    ...asset,
    links: {
      likeCount: `/api/assets/${asset.id}/likes/count`,
      ...(isOwnAsset
        ? {
            delete: `/api/assets/${asset.id}/delete`,
          }
        : {
            like: `/api/assets/${asset.id}/likes`,
          }),
      creator: `/galleries/${asset.creator.id}`,
    },
  });
};
