import { GuestResponse } from '@main/rest-models';

export const getGuest = (): GuestResponse => {
  return {
    links: {
      loginPage: '/users/login',
      login: '/api/users/login',
      logout: '/api/users/logout',
      signup: '/api/users/new',
    },
  };
};
