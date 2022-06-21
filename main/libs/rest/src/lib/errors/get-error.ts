import { ErrorResponse } from '@main/rest-models';

export const getError = (e: any): ErrorResponse => {
  const status = e.status || 400;

  console.log(e);

  return {
    e,
    status: 401, // derive from e later
    links: {
      home: '/',
    },
  };
};
