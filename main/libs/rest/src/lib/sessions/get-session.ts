import { environment } from '@main/environment';

export const getSession = async (sessionId: string) => {
  const db = environment.db;
  const session = await db.session.get(sessionId);

  return {
    isLoggedIn: session.isLoggedIn,
    links: {
      session: `/api/sessions`,
    },
  };
};
