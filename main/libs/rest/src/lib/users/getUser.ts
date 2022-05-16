import { environment } from '@main/environment';
import { UserResponse } from '@main/rest-models';

export const getUser = async (userId: string): Promise<UserResponse> => {
  const db = environment.db;
  const user = await db.get.user(userId);
  return {
    ...user,
    links: {
      newGallery: {
        rel: 'new-gallery',
        url: '/galleries/new',
      },
      editAccount: {
        rel: 'edit-account',
        url: '/users/edit',
      },
      balance: {
        rel: 'balance',
        url: '/api/transactions/balance',
      },
      me: {
        rel: 'me',
        url: '/api/users/me',
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
