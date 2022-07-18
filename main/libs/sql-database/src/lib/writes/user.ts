import { encode } from '@main/hash';
import { connectToDatabase } from '../db';
import { Creator } from '../entity/creator';
import { DailyTopUp } from '../entity/daily-top-up';
import { TransactionTypes } from '../entity/transaction';
import { User } from '../entity/user';
import { saveTransaction } from './transaction';

export const saveUser = async (
  email: string,
  topUpCredit: number
): Promise<{ id: string }> => {
  const db = await connectToDatabase();

  return await db.transaction(async (manager) => {
    const existingUser = await db.getRepository(User).findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const dbUser = new User();
    const dbCreator = new Creator();
    const dbDailyTopUp = new DailyTopUp();

    dbCreator.description = 'New gallery';
    dbCreator.avatarUrl = 'https://source.unsplash.com/random/300x300';
    dbCreator.name = 'newCreator';

    const savedCreator = await manager.save(dbCreator);
    const savedDailyTopUp = await manager.save(dbDailyTopUp);

    dbUser.email = email;
    dbUser.creatorId = savedCreator.id;
    dbUser.dailyTopUpId = savedDailyTopUp.id;

    const savedUser = await manager.save(dbUser);

    await saveTransaction({
      type: TransactionTypes.MINT,
      actionId: encode(savedDailyTopUp.id),
      userId: encode(savedUser.id),
      credit: topUpCredit,
      manager,
    });

    return {
      id: encode(savedUser.id),
    };
  });
};
