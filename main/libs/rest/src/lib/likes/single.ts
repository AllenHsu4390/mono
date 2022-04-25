import { environment } from '@main/environment';
import { Cost, Like, Response } from '@main/models';

export const saveLike = async (like: Like): Promise<Response> => {
  const db = environment.db;
  const cache = environment.cache;

  const balance = await db.get.balance(like.userId);
  const newBalance = balance - Cost.Like;
  if (newBalance < 0) {
    throw new Error('Balance Error: Not enough balance');
  }

  await cache.save.like(like, () => db.save.like(like));

  const links = [];

  return {
    links,
  };
};
