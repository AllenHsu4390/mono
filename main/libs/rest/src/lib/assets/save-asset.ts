import { environment } from '@main/environment';
import { User } from '@main/rest-models';
import { saveCdnData } from '../cdn/save-cdn-data';

export const saveAsset = async (
  user: User,
  imageData: string
): Promise<void> => {
  const db = environment.db;
  const cdnAsset = await saveCdnData(imageData);
  await db.asset.save(user.creatorId, cdnAsset.url);
};
