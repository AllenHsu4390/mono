import { environment } from '@main/environment';
import { UserResponse } from '@main/rest-models';

export const getUser = async (userId: string): Promise<UserResponse> => {
  const db = environment.db;
  const user = await db.get.user(userId);
  const follows = await db.get.follows(userId, '1');
  return {
    ...user,
    links: {
      follows: follows.follows.map((f) => ({
        rel: 'follows',
        url: `/${f.creator.id}`,
      })),
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
    },
  };
};

export const getUserIdByEmail = async (email: string): Promise<string> => {
  const db = environment.db;
  const userId = await db.get.userId(email);
  return userId;
};
