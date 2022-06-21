import { environment } from '@main/environment';

export const createSession = async (userId: string) => {
  const db = environment.db;
  return await db.session.create(userId);
};
