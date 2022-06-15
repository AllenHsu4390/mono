import { environment } from '@main/environment';
import { LikesCountResponse } from '@main/rest-models';

export const getLikesCount = async (
  assetId: string
): Promise<LikesCountResponse> => {
  const { db, cache } = environment;
  const likesCount = await cache.likesCount.get(
    assetId,
    async () => await db.likesCount.get(assetId)
  );

  return {
    count: likesCount,
  };
};
