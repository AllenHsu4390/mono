import { environment } from '@main/environment';
import { BalanceResponse } from '@main/rest-models';

export const getBalance = async (userId: string): Promise<BalanceResponse> => {
  const { cache, db } = environment;
  const sum = await cache.get.balance(
    userId,
    async () => await db.get.balance(userId)
  );

  return {
    sum,
  };
};
