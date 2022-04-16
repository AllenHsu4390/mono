import { connectToDatabase } from '../db';
import { Like } from '../entity/like';

export const getLikesCount = async (id): Promise<number> => {
  const db = await connectToDatabase();
  const assetId = Number(id);
  const count = await db.getRepository(Like).count({
    where: {
      assetId,
    },
  });
  return count;
};
