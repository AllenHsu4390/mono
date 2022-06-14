import { environment } from '@main/environment';
import { LikesCountResponse } from '@main/rest-models';

export const getLikesCount = async (
  assetId: string
): Promise<LikesCountResponse> => {
  const { db, cache } = environment;
  const likesCount = await cache.get.likesCount(assetId, () =>
    db.get.likesCount(assetId)
  );

  return {
    count: likesCount,
  };
};
