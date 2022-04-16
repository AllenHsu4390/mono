import { environment } from '@main/environment';
import { Asset } from '@main/models';
import { AssetResponse } from '../responses';

export const getAsset = async (id: string): Promise<Asset & AssetResponse> => {
  const db = environment().db;
  return {
    ...(await db.get.asset(id)),
    links: [
      {
        rel: 'like-count',
        url: `/api/assets/${id}/likes/count`,
      },
      {
        rel: 'like',
        url: `/api/assets/${id}/likes`,
      },
    ],
  };
};
