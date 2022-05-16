import { User } from '@main/rest-models';
import NodeCache from 'node-cache';

const DEFAULT_TTL = 3600000; // 1 hours

const memoryCache = new NodeCache({
  maxKeys: 1000000,
});

export const getUser = async (
  userId: string,
  dbGet: () => Promise<User>
): Promise<number> => {
  // fix for topup

  const key = `user-{${userId}}`;
  if (!memoryCache.has(key)) {
    const value = await dbGet();
    memoryCache.set(key, value, DEFAULT_TTL);
  }

  // guaranteed
  return memoryCache.get(key) as number;
};

const getLikesCount = async (
  assetId: string,
  dbGet: () => Promise<number>
): Promise<number> => {
  const key = `likes-count-{${assetId}}`;
  if (!memoryCache.has(key)) {
    const value = await dbGet();
    memoryCache.set(key, value, DEFAULT_TTL);
  }

  // guaranteed
  return memoryCache.get(key) as number;
};
const getBalance = async (
  userId: string,
  dbGet: () => Promise<number>
): Promise<number> => {
  const key = `balance-{${userId}}`;
  if (!memoryCache.has(key)) {
    const value = await dbGet();
    memoryCache.set(key, value, DEFAULT_TTL);
  }

  // guaranteed
  return memoryCache.get(key) as number;
};

const saveLikesCount = async (assetId: string) => {
  const key = `likes-count-{${assetId}}`;
  if (memoryCache.has(key)) {
    const value = Number(memoryCache.get(key));
    memoryCache.set(key, value + 1, DEFAULT_TTL);
  }
};

const saveBalance = async ({
  credit = 0,
  debit = 0,
  userId,
}: {
  credit: number;
  debit: number;
  userId: string;
}) => {
  const balanceKey = `balance-{${userId}}`;
  if (memoryCache.has(balanceKey)) {
    const value = Number(memoryCache.get(balanceKey));
    memoryCache.set(balanceKey, value + credit - debit, DEFAULT_TTL);
  }
};

export const cache = {
  get: {
    likesCount: getLikesCount,
    balance: getBalance,
  },
  save: {
    likesCount: saveLikesCount,
    balance: saveBalance,
  },
};
