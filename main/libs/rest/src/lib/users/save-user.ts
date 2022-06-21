import { environment } from '@main/environment';
import { Gain } from '@main/rest-models';

export interface SaveUserProps {
  email: string;
}

export const saveUser = async ({ email }: SaveUserProps) => {
  const db = environment.db;
  const { id } = await db.user.save(email, Gain.DailyTopUp);
  return id;
};
