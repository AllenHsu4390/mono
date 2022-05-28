import { SessionResponse } from '@main/rest-models';

export const getSession = (): SessionResponse => {
  return {
    isUsualClient: true,
    isLoggedIn: true,
    links: {
      login: {
        rel: 'login',
        url: '/api/login',
      },
      logout: {
        rel: 'logout',
        url: '/api/logout',
      },
      session: {
        rel: 'session',
        url: '/api/session',
      },
    },
  };
};
