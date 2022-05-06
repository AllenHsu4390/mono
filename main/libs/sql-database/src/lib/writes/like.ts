import { connectToDatabase } from '../db';
import { Like as LikeEntity } from '../entity/like';
import { decode, encode } from '../hash';

export const saveLike = async (userId: string, assetId: string) => {
  const db = await connectToDatabase();
  const savedLike = await db.transaction(async (manager) => {
    const dbLike = new LikeEntity();
    dbLike.userId = decode(userId);
    dbLike.assetId = decode(assetId);
    return await manager.save(dbLike);
  });

  return {
    id: encode(savedLike.id),
  };
};
