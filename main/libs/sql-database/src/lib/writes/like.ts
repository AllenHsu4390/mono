import { Like } from '@main/models';
import { connectToDatabase } from '../db';
import { Like as LikeEntity } from '../entity/like';
import { decode } from '../hash';

export const saveLike = async ({ userId, assetId }: Like): Promise<void> => {
  const db = await connectToDatabase();
  const dbLike = new LikeEntity();
  dbLike.userId = decode(userId);
  dbLike.assetId = decode(assetId);

  await db.manager.save(dbLike);
};
