import { decode, encode } from '@main/hash';
import { connectToDatabase } from '../db';
import { Category } from '../entity/category';

export const saveAssetCategory = async (
  userId: string,
  assetId: string,
  name: string
) => {
  const db = await connectToDatabase();

  return await db.transaction(async (manager) => {
    const dbCategory = new Category();
    dbCategory.name = name;
    dbCategory.userId = decode(userId);
    dbCategory.assetId = decode(assetId);
    const savedCategory = await manager.save(dbCategory);

    return {
      id: encode(savedCategory.id),
    };
  });
};
