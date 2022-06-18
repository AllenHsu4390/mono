import { SessionResponse } from '@main/rest-models';
import { db } from '@main/sql-database';

export const getSession = async (userId?: string): Promise<SessionResponse> => {
  const session = userId ? await db.session.get(userId) : null;

  return {
    isUsualClient: true,
    isLoggedIn: !!session && session.isLoggedIn,
    links: {
      login: {
        rel: 'login',
        url: '/api/users/login',
      },
      logout: {
        rel: 'logout',
        url: '/api/users/logout',
      },
      session: {
        rel: 'session',
        url: '/api/sessions',
      },
      signup: {
        rel: 'signup',
        url: '/api/users/signup',
      },
    },
  };
};
