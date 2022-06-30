import { environment } from '@main/environment';
import { getCdnData } from '../cdn/get-cdn-data';

export const saveAsset = async (
  creatorId: string,
  cdnToken: string
): Promise<void> => {
  const db = environment.db;

  await db.asset.save(creatorId, getCdnData(cdnToken));
};
