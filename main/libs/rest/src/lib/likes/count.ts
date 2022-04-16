import { environment } from '@main/environment';
import { LikesCount, Response } from '@main/models';

export const getLikesCount = async (
  assetId: string
): Promise<LikesCount & Response> => {
  const db = environment().db;
  const likesCount = await db.get.likesCount(assetId);

  const links = [];

  return {
    count: likesCount,
    links,
  };
};
