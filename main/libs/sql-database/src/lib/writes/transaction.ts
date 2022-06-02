import { EntityManager } from 'typeorm';
import { connectToDatabase } from '../db';
import { Transaction, TransactionTypes } from '../entity/transaction';
import { decode, encode } from '@main/hash';

export const saveTransaction = async (
  type: TransactionTypes,
  userId: string,
  actionId: string,
  credit: number,
  debit: number,
  manager?: EntityManager
): Promise<{ id: string }> => {
  const db = manager || (await connectToDatabase());
  const savedTransaction = await db.transaction(async (manager) => {
    const dbTransaction = new Transaction();
    dbTransaction.type = type;
    dbTransaction.userId = decode(userId);
    dbTransaction.actionId = decode(actionId);
    dbTransaction.credit = credit;
    dbTransaction.debit = debit;
    return await manager.save(dbTransaction);
  });

  return {
    id: encode(savedTransaction.id),
  };
};
