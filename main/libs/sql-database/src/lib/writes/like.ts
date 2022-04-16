import { Like } from '@main/models';
import { connectToDatabase } from '../db';
import { Like as LikeEntity } from '../entity/like';

export const saveLike = async ({ userId, assetId }: Like): Promise<void> => {
  const db = await connectToDatabase();
  const dbLike = new LikeEntity();
  dbLike.userId = Number(userId);
  dbLike.assetId = Number(assetId);

  await db.manager.save(dbLike);
};
