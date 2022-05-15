import { EntityManager } from 'typeorm';
import { connectToDatabase } from '../db';
import { Transaction } from '../entity/transaction';
import { decode } from '../hash';

export const getBalance = async (
  id: string,
  manager?: EntityManager
): Promise<number> => {
  const db = manager || (await connectToDatabase());
  const userId = decode(id);

  const { sum } = await db
    .getRepository(Transaction)
    .createQueryBuilder('transaction')
    .select('SUM(transaction.credit - transaction.debit)', 'sum')
    .where('transaction.userId = :id', { id: userId })
    .getRawOne();

  return Number(sum);
};
