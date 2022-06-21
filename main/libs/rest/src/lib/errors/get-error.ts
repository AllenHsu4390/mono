import { ErrorResponse } from '@main/rest-models';

export const getError = (e: any): ErrorResponse => {
  const status = e.status || 400;
  return {
    e,
    status, // derive from e later
    links: {
      home: '/',
    },
  };
};
