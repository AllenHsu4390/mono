import { environment } from '@main/environment';
import { LikesCount, Response } from '@main/models';

export const getLikesCount = async (
  assetId: string
): Promise<LikesCount & Response> => {
  const db = environment.db;
  const cache = environment.cache;
  const likesCount = await cache.get.likesCount(assetId, () =>
    db.get.likesCount(assetId)
  );

  const links = [];

  return {
    count: likesCount,
    links,
  };
};
