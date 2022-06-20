import { db } from '@main/sql-database';

export const deleteSession = async (sessionId: string) => {
  await db.session.delete(sessionId);
};
