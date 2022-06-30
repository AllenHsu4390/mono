import { environment } from '@main/environment';

export const getUserIdByEmail = async (email: string): Promise<string> => {
  const db = environment.db;
  const userId = await db.userId.get(email);
  return userId;
};
