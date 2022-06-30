import { environment } from '@main/environment';

export const updateSession = async (sessionId: string) => {
  const db = environment.db;
  return await db.session.update(sessionId);
};
