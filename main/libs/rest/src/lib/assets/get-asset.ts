import { environment } from '@main/environment';
import { AssetResponse } from '@main/rest-models';

export const getAssetOrNull = async (id: string): Promise<AssetResponse> => {
  try {
    return await getAsset(id);
  } catch (e) {
    return null;
  }
};

export const getAsset = async (id: string): Promise<AssetResponse> => {
  const db = environment.db;
  const asset = await db.get.asset(id);
  return {
    ...asset,
    links: {
      likeCount: {
        rel: 'like-count',
        url: `/api/assets/${asset.id}/likes/count`,
      },
      like: {
        rel: 'like',
        url: `/api/assets/${asset.id}/likes`,
      },
      creator: {
        rel: 'creator',
        url: `/galleries/${asset.creator.id}`,
      },
    },
  };
};
