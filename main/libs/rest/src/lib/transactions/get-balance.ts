import { environment } from '@main/environment';
import { BalanceResponse } from '@main/rest-models';

export const getBalance = async (userId: string): Promise<BalanceResponse> => {
  const { cache, db } = environment;
  const sum = await cache.balance.get(
    userId,
    async () => await db.balance.get(userId)
  );

  return {
    sum,
  };
};
