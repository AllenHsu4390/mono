import { db } from '@main/sql-database';

export const createSession = async (userId: string) => {
  return await db.session.create(userId);
};
