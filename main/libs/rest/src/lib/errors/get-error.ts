import { ErrorResponse } from '@main/rest-models';
import { env } from 'process';

export const getError = (e: any): ErrorResponse => {
  const status = e.status || 400;

  if (process.env.NODE_ENV === 'development') {
    console.log(e);
  }

  return {
    e,
    status, // derive from e later
    links: {
      home: '/',
    },
  };
};
