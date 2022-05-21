import { connectToDatabase } from '../db';
import { DailyTopUp } from '../entity/dailyTopUp';
import { decode, encode } from '@main/hash';

export const getDailyTopUp = async (id: string) => {
  const db = await connectToDatabase();
  const dailyTopUp = await db.getRepository(DailyTopUp).findOneOrFail({
    where: {
      id: decode(id),
    },
  });
  return {
    id: encode(dailyTopUp.id),
    createdAt: dailyTopUp.createdAt,
    updatedAt: dailyTopUp.updatedAt,
  };
};
