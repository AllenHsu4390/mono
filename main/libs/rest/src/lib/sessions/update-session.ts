import { db } from '@main/sql-database';

export const updateSession = async (sessionId: string) => {
  await db.session.update(sessionId);
};
