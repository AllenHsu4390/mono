import { environment } from '@main/environment';
import { AssetResponse, User } from '@main/rest-models';

export const getAsset = async (
  id: string,
  user?: User
): Promise<AssetResponse> => {
  const db = environment.db;
  const asset = await db.get.asset(id);
  const isLogin = !!user;
  const isOwnAsset = isLogin && asset.creator.id === user.creatorId;

  return {
    ...asset,
    links: {
      likeCount: {
        rel: 'like-count',
        url: `/api/assets/${asset.id}/likes/count`,
      },
      ...(isOwnAsset
        ? {}
        : {
            like: {
              rel: 'like',
              url: `/api/assets/${asset.id}/likes`,
            },
          }),
      ...(isOwnAsset
        ? {
            delete: {
              rel: 'delete',
              url: `/api/assets/${asset.id}/delete`,
            },
          }
        : {}),
      creator: {
        rel: 'creator',
        url: `/galleries/${asset.creator.id}`,
      },
    },
  };
};
