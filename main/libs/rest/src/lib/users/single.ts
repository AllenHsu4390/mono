import { environment } from '@main/environment';
import { User } from '@main/models';
import { UserResponse } from '../responses';

export const getUser = async (userId: string): Promise<User & UserResponse> => {
  const db = environment.db;
  const user = await db.get.user(userId);
  const follows = await db.get.follows(userId, '1');
  return {
    ...user,
    links: [
      ...follows.follows.map((f): UserResponse['links'][0] => ({
        rel: 'follows',
        url: `/${f.creator.id}`,
      })),
      {
        rel: 'logout',
        url: '/users/logout',
      },
      {
        rel: 'new-gallery',
        url: '/galleries/new',
      },
      {
        rel: 'edit-account',
        url: '/users/edit',
      },
      {
        rel: 'balance',
        url: '/api/transactions/balance',
      },
    ],
  };
};

export const getUserIdByEmail = async (email: string): Promise<string> => {
  const db = environment.db;
  const userId = await db.get.userId(email);
  return userId;
};
