import { connectToDatabase } from '../db';
import { DailyTopUp } from '../entity/dailyTopUp';
import { TransactionTypes } from '../entity/transaction';
import { decode, encode } from '../hash';
import { saveTransaction } from './transaction';

const isTopUpTime = (updatedAt: Date) => {
  const currentTime = new Date().getTime();
  const nextTopUpTime = updatedAt.getTime() + 1 * 24 * 60 * 60 * 1000; // day hour min sec msec

  return currentTime > nextTopUpTime;
};

export const saveDailyTopUp = async (
  id: string,
  userId: string,
  topUpCredit: number
) => {
  const db = await connectToDatabase();
  await db.transaction(async (manager) => {
    const found = await manager.getRepository(DailyTopUp).findOneOrFail({
      where: {
        id: decode(id),
      },
    });

    if (!isTopUpTime(found.updatedAt)) {
      throw new Error('Already claimed daily top up');
    }

    found.updatedAt = new Date();
    const savedDailyTopUp = await manager.save(found);

    await saveTransaction(
      TransactionTypes.MINT,
      userId,
      encode(savedDailyTopUp.id),
      topUpCredit,
      0,
      manager
    );
  });
};
