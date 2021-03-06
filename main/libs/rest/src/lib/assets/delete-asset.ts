import { environment } from '@main/environment';

export const deleteAsset = async (
  assetId: string,
  creatorId: string
): Promise<void> => {
  const db = environment.db;

  await db.asset.delete(assetId, creatorId);
};
