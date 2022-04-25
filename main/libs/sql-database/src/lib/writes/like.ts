import { Cost, Like } from '@main/models';
import { connectToDatabase } from '../db';
import { Like as LikeEntity } from '../entity/like';
import { Transaction } from '../entity/transaction';
import { decode } from '../hash';
import { getBalance } from '../reads/balance';

export const saveLike = async ({ userId, assetId }: Like): Promise<void> => {
  const db = await connectToDatabase();

  await db.transaction(async (manager) => {
    const balance = await getBalance(userId);
    const newBalance = balance - Cost.Like;
    if (newBalance < 0) {
      throw new Error('Balance Error: Not enough balance');
    }

    const dbLike = new LikeEntity();
    dbLike.userId = decode(userId);
    dbLike.assetId = decode(assetId);
    const savedLike = await manager.save(dbLike);

    const dbTransaction = new Transaction();
    dbTransaction.type = 'like';
    dbTransaction.userId = savedLike.userId;
    dbTransaction.actionId = savedLike.id;
    dbTransaction.credit = 0;
    dbTransaction.debit = Cost.Like;
    await manager.save(dbTransaction);
  });
};
