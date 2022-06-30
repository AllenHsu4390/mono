import { connectToDatabase } from '../db';
import { Like as LikeEntity } from '../entity/like';
import { TransactionTypes } from '../entity/transaction';
import { decode, encode } from '@main/hash';
import { getBalance } from '../reads/balance';
import { saveTransaction } from './transaction';

export const saveLike = async (
  userId: string,
  assetId: string,
  debit: number
) => {
  const db = await connectToDatabase();

  return await db.transaction(async (manager) => {
    const dbLike = new LikeEntity();
    dbLike.userId = decode(userId);
    dbLike.assetId = decode(assetId);
    const dbLikeSaved = await manager.save(dbLike);

    const balance = await getBalance(userId, manager);

    if (balance < debit) {
      throw new Error('Not enough balance');
    }

    const likeId = encode(dbLikeSaved.id);
    const dbTransactionSaved = await saveTransaction({
      type: TransactionTypes.LIKE,
      userId,
      actionId: likeId,
      debit,
      manager,
    });

    return {
      like: {
        id: likeId,
      },
      transaction: {
        id: dbTransactionSaved.id,
      },
    };
  });
};
