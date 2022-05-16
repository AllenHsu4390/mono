import { SessionResponse } from '@main/rest-models';

export const getSession = (): SessionResponse => {
  return {
    isUsualClient: true,
    links: {
      login: {
        rel: 'login',
        url: '/api/login',
      },
      logout: {
        rel: 'logout',
        url: '/api/logout',
      },
    },
  };
};
