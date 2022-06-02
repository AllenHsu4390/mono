import { ErrorResponse } from '@main/rest-models';

export const getError = (e: Error): ErrorResponse => {
  return {
    e,
    status: 401, // derive from e later
    links: {
      home: {
        rel: 'home',
        url: '/',
      },
    },
  };
};
