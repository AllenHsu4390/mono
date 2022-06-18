import { environment } from '@main/environment';
import { Gain } from '@main/rest-models';

export const saveUser = async (email: string) => {
  const db = environment.db;
  const { id } = await db.user.save(email, Gain.DailyTopUp);
  return id;
};
