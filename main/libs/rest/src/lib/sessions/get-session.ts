import { SessionResponse } from '@main/rest-models';
import { db } from '@main/sql-database';

export const getSession = async (
  sessionId: string
): Promise<SessionResponse> => {
  const session = await db.session.get(sessionId);

  return {
    isLoggedIn: session.isLoggedIn,
    links: {
      session: {
        rel: 'session',
        url: `/api/sessions`,
      },
    },
  };
};
