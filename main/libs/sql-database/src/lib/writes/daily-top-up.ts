import { connectToDatabase } from '../db';
import { TransactionTypes } from '../entity/transaction';
import { User } from '../entity/user';
import { decode, encode } from '@main/hash';
import { saveTransaction } from './transaction';

export const isTopUpTime = (updatedAt: Date) => {
  const resetTime = new Date();
  resetTime.setHours(0, 0, 0, 0); // 0:00 today
  return resetTime.getTime() > updatedAt.getTime();
};

export const saveDailyTopUp = async (userId: string, topUpCredit: number) => {
  const db = await connectToDatabase();
  await db.transaction(async (manager) => {
    const { dailyTopUp } = await manager.getRepository(User).findOneOrFail({
      select: ['dailyTopUp'],
      where: {
        id: decode(userId),
      },
      relations: ['dailyTopUp'],
    });

    if (!isTopUpTime(dailyTopUp.updatedAt)) {
      throw new Error('Already claimed daily top up');
    }

    dailyTopUp.updatedAt = new Date();
    const savedDailyTopUp = await manager.save(dailyTopUp, {});

    const savedTransaction = await saveTransaction(
      TransactionTypes.MINT,
      userId,
      encode(savedDailyTopUp.id),
      topUpCredit,
      0,
      manager
    );

    return {
      transaction: savedTransaction,
      dailyTopUp: {
        id: encode(savedDailyTopUp.id),
      },
    };
  });
};
