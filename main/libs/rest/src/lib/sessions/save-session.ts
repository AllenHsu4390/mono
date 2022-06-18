import { db } from '@main/sql-database';

export const saveSession = async (userId: string) => {
  await db.session.save(userId);
};
