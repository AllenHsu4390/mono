import { environment } from '@main/environment';
import { AssetResponse, User } from '@main/rest-models';

export const getAsset = async (
  id: string,
  user?: User | null
): Promise<AssetResponse> => {
  const db = environment.db;
  const asset = await db.asset.get(id);
  const isLogin = !!user;
  const isOwnAsset = isLogin && asset.creator.id === user.creatorId;

  return {
    ...asset,
    links: {
      likeCount: `/api/assets/${asset.id}/likes/count`,
      ...(isOwnAsset
        ? {}
        : {
            like: `/api/assets/${asset.id}/likes`,
          }),
      ...(isOwnAsset
        ? {
            delete: `/api/assets/${asset.id}/delete`,
          }
        : {}),
      creator: `/galleries/${asset.creator.id}`,
    },
  };
};
