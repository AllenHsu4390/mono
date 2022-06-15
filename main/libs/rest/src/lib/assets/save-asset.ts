import { environment } from '@main/environment';
import { User } from '@main/rest-models';
import { saveCdnData } from '../cdn/save-cdn-data';

export const saveAsset = async (
  creatorId: string,
  imageData: string,
  user: User
): Promise<void> => {
  const db = environment.db;
  if (user.creatorId !== creatorId) {
    throw new Error('Creator did not match user creator');
  }
  const cdnAsset = await saveCdnData(imageData);
  await db.asset.save(creatorId, cdnAsset.url);
};
