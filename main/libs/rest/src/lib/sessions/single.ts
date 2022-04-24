import { Session } from '@main/models';
import { SessionResponse } from '../responses';

export const getSession = async (): Promise<Session & SessionResponse> => {
  const links: SessionResponse['links'] = [
    {
      rel: 'login',
      url: '/api/login',
    },
    {
      rel: 'logout',
      url: '/api/logout',
    },
  ];

  return {
    isUsualClient: true,
    links,
  };
};
