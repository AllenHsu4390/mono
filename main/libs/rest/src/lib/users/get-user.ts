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
