import { environment } from '@main/environment';
import { SaveAssetResultResponse } from '@main/rest-models';
import { getCdnData } from '../cdn/get-cdn-data';

export const saveAsset = async (
  creatorId: string,
  cdnToken: string
): Promise<SaveAssetResultResponse> => {
  const db = environment.db;

  const savedAsset = await db.asset.save(creatorId, getCdnData(cdnToken));

  return {
    id: savedAsset.id,
    links: {
      asset: `/assets/${savedAsset.id}`,
    },
  };
};
