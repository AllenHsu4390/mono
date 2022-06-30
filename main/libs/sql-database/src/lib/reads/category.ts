import { connectToDatabase } from '../db';
import { decode } from '@main/hash';
import { Category } from '../entity/category';

export const getAssetCategories = async (
  id: string
): Promise<Array<string>> => {
  const db = await connectToDatabase();
  const assetId = decode(id);
  const categories = await db.getRepository(Category).find({
    where: {
      assetId,
    },
  });

  const names = categories.map((category) => category.name);

  return Array.from(new Set(names).values());
};
