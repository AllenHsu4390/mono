import { environment } from '@main/environment';
import { Asset } from '@main/models';
import { AssetResponse } from '../responses';

export const getAsset = async (id: string): Promise<Asset & AssetResponse> => {
  const db = environment.db;
  const asset = await db.get.asset(id);
  return {
    ...asset,
    links: [
      {
        rel: 'like-count',
        url: `/api/assets/${asset.id}/likes/count`,
      },
      {
        rel: 'like',
        url: `/api/assets/${asset.id}/likes`,
      },
      {
        rel: 'creator',
        url: `/${asset.creator.id}`,
      },
    ],
  };
};
