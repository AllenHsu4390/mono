import { connectToDatabase } from '../db';
import { Like } from '../entity/like';
import { decode } from '@main/hash';

export const getLikesCount = async (id): Promise<number> => {
  const db = await connectToDatabase();
  const assetId = decode(id);
  const count = await db.getRepository(Like).count({
    where: {
      assetId,
    },
  });
  return count;
};
