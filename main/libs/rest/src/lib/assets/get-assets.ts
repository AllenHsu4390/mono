import { environment } from '@main/environment';
import { AssetsResponse } from '@main/rest-models';

export const getAssets = async (
  creatorId: string,
  pageId: string
): Promise<AssetsResponse> => {
  const db = environment.db;
  const { assets, pagination } = await db.assets.get(creatorId, pageId);

  return {
    assets,
    pagination,
    links: {
      assets: assets.map((a) => `/assets/${a.id}`),
      ...(pagination.next
        ? {
            next: `/api/assets?creatorId=${creatorId}&pageId=${pagination.next}`,
          }
        : {}),
    },
  };
};
