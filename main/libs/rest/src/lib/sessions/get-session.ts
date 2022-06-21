import { environment } from '@main/environment';
import { SessionResponse } from '@main/rest-models';

export const getSession = async (
  sessionId: string
): Promise<SessionResponse> => {
  const db = environment.db;
  const session = await db.session.get(sessionId);

  return {
    isLoggedIn: session.isLoggedIn,
    links: {
      session: `/api/sessions`,
    },
  };
};
