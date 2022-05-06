import { environment } from '@main/environment';
import { Cost, DropResponse, Like } from '@main/rest-models';

const dropRate = ({ pctChance } = { pctChance: 0.02 }) => {
  return Math.random() < pctChance;
};

export const saveLike = async (like: Like): Promise<DropResponse> => {
  const db = environment.db;
  const cache = environment.cache;

  const balance = await db.get.balance(like.userId);
  const newBalance = balance - Cost.Like;
  if (newBalance < 0) {
    throw new Error('Balance Error: Not enough balance');
  }

  const newLike = await cache.save.likesCount(
    like.assetId,
    async () => await db.save.like(like.userId, like.assetId)
  );

  await cache.save.balance(
    { credit: 0, debit: Cost.Like, userId: like.userId },
    async () =>
      await db.save.transaction(
        db.enums.transactionTypes.LIKE,
        like.userId,
        newLike.id,
        0,
        Cost.Like
      )
  );

  const isDropped = dropRate();
  return {
    isDropped,
    assetId: like.assetId,
  };
};
