import { GuestResponse } from '@main/rest-models';

export const getGuest = (): GuestResponse => {
  return {
    links: {
      loginPage: {
        rel: 'login-page',
        url: '/users/login',
      },
      login: {
        rel: 'login',
        url: '/api/users/login',
      },
      logout: {
        rel: 'logout',
        url: '/api/users/logout',
      },
      signup: {
        rel: 'signup',
        url: '/api/users/new',
      },
    },
  };
};
