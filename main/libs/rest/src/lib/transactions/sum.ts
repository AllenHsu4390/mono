import { environment } from '@main/environment';
import { Balance, Response } from '@main/models';

export const getBalance = async (
  userId: string
): Promise<Balance & Response> => {
  const db = environment.db;
  const sum = await db.get.balance(userId);

  const links = [];

  return {
    sum,
    links,
  };
};
