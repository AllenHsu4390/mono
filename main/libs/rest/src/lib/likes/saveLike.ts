import { environment } from '@main/environment';
import { Cost, DropResponse, Like } from '@main/rest-models';

const dropRate = ({ pctChance } = { pctChance: 0.02 }) => {
  return Math.random() < pctChance;
};

export const saveLike = async (like: Like): Promise<DropResponse> => {
  const db = environment.db;
  const cache = environment.cache;

  await db.save.like(like.userId, like.assetId, Cost.Like);

  await cache.save.likesCount(like.assetId);
  await cache.save.balance({
    credit: 0,
    debit: Cost.Like,
    userId: like.userId,
  });

  const isDropped = dropRate();
  return {
    isDropped,
    assetId: like.assetId,
  };
};
