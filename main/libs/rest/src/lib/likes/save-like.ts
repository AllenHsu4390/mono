import { environment } from '@main/environment';
import { Cost, DropResponse, Like } from '@main/rest-models';

const dropRate = ({ pctChance } = { pctChance: 0.02 }) => {
  return Math.random() < pctChance;
};

export const saveLike = async (like: Like): Promise<DropResponse> => {
  const { db, cache } = environment;

  await db.like.save(like.userId, like.assetId, Cost.Like);

  await cache.likesCount.save(like.assetId, (prevCount) => {
    return prevCount + 1;
  });
  await cache.balance.save(like.userId, (prevBalance) => {
    return prevBalance - Cost.Like;
  });

  return {
    isDropped: dropRate(),
    assetId: like.assetId,
  };
};
