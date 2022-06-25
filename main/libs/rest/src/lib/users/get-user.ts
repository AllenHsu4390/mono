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
      editAccount: '/users/edit',
      gallery: `/galleries/${user.creatorId}`,
      balance: '/api/transactions/balance',
      creator: `/api/creators/me`,
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
