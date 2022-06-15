import { environment } from '@main/environment';
import { UserResponse } from '@main/rest-models';

export const getUser = async (userId: string): Promise<UserResponse> => {
  const { cache, db } = environment;

  const user = await cache.user.get(
    userId,
    async () => await db.user.get(userId)
  );

  return {
    ...user,
    links: {
      editAccount: {
        rel: 'edit-account',
        url: '/users/edit',
      },
      gallery: {
        rel: 'gallery',
        url: `/galleries/${user.creatorId}`,
      },
      balance: {
        rel: 'balance',
        url: '/api/transactions/balance',
      },
      creator: {
        rel: 'creator',
        url: `/api/creators/${user.creatorId}`,
      },
      me: {
        rel: 'me',
        url: '/api/users/me',
      },
      logout: {
        rel: 'logout',
        url: '/users/logout',
      },
      ...(user.hasDailyTopUp
        ? {
            dailyTopUp: {
              rel: 'daily-top-up',
              url: '/api/transactions/mint',
            },
          }
        : {}),
    },
  };
};
