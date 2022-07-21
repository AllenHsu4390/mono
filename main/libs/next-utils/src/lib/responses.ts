import { environment } from '@main/environment';
import {
  AssetsResponse,
  CategoriesResponse,
  GuestResponse,
  User,
} from '@main/rest-models';

export const getUserResponse = async (userId: string) => {
  if (!userId) {
    throw new Error('Invalid Auth');
  }

  const { cache, db } = environment;

  const user = await cache.user.get(
    userId,
    async () => await db.user.get(userId)
  );

  return {
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
  };
};

export const getCreatorResponse = async (
  creatorId: string,
  user: User | null
) => {
  const { db } = environment;
  const creator = await db.creator.get(creatorId);

  return {
    ...creator,
    links: {
      assets: `/api/assets?creatorId=${creatorId}&pageId=1`,
      gallery: `/galleries/${creatorId}`,
      ...(user && user.creatorId === creatorId
        ? {
            newAsset: `/api/assets`,
          }
        : {}),
    },
  };
};

export const getGuestResponse = (): GuestResponse => {
  return {
    links: {
      loginPage: '/users/login',
      login: '/api/users/login',
      logout: '/api/users/logout',
      signup: '/api/users',
      categories: '/api/categories',
    },
  };
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

export const getAssetsResponse = async (creatorId: string, pageId: string) => {
  const { db } = environment;
  const { assets, pagination } = await db.assets.get(creatorId, pageId);

  return {
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
  };
};

export const getTopAssetsResponse = async (
  pageId: string
): Promise<AssetsResponse> => {
  const db = environment.db;
  const { assets, pagination } = await db.topAssets.get(pageId);

  return {
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
  };
};

export const getAssetResponse = async (id: string, user: User | null) => {
  const { db } = environment;
  const asset = await db.asset.get(id);
  const isLogin = !!user;
  const isOwnAsset = isLogin && asset.creator.id === user.creatorId;

  return {
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
  };
};
