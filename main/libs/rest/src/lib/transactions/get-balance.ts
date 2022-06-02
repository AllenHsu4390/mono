import { environment } from '@main/environment';
import { BalanceResponse } from '@main/rest-models';

export const getBalance = async (userId: string): Promise<BalanceResponse> => {
  const db = environment.db;
  const sum = await db.get.balance(userId);

  return {
    sum,
  };
};
