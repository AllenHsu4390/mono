import { environment } from '@main/environment';
import { User } from '@main/models';
import { UserResponse } from '../responses';

export const getUser = async (userId: string): Promise<User & UserResponse> => {
  const db = environment().db;
  const user = await db.get.user(userId);
  return {
    ...user,
    links: [
      {
        rel: 'logout',
        url: '/users/logout',
      },
      {
        rel: 'new-album',
        url: '/albums/new',
      },
      {
        rel: 'edit-account',
        url: '/users/edit',
      },
    ],
  };
};

export const saveUser = async (user: User): Promise<User & UserResponse> => {
  const db = environment().db;
  await db.save.user(user);
  return {
    ...user,
    links: [
      {
        rel: 'logout',
        url: '/users/logout',
      },
      {
        rel: 'new-album',
        url: '/albums/new',
      },
      {
        rel: 'edit-account',
        url: '/users/edit',
      },
    ],
  };
};
