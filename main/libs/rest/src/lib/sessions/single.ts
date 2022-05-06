import { SessionResponse } from '@main/rest-models';

export const getSession = async (): Promise<SessionResponse> => {
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
