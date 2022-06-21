import { environment } from '@main/environment';

export const deleteSession = async (sessionId: string) => {
  const db = environment.db;
  await db.session.delete(sessionId);
};
