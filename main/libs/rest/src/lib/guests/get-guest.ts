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
      signup: {
        rel: 'signup',
        url: '/api/users/new',
      },
    },
  };
};
