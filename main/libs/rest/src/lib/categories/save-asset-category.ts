import { environment } from '@main/environment';

export const saveAssetCategory = async (
  userId: string,
  assetId: string,
  name: string
): Promise<void> => {
  const { db } = environment;

  await db.category.save(userId, assetId, name);
};
