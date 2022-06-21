import { environment } from '@main/environment';

export const updateSession = async (sessionId: string) => {
  const db = environment.db;
  await db.session.update(sessionId);
};
