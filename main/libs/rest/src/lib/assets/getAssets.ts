import { environment } from '@main/environment';
import { AssetsResponse } from '@main/rest-models';

export const getAssets = async (
  creatorId: string,
  pageId: string
): Promise<AssetsResponse> => {
  const db = environment.db;
  const { assets, pagination } = await db.get.assets(creatorId, pageId);

  return {
    assets,
    pagination,
    links: {
      asset: assets.map((a) => ({
        rel: 'asset',
        url: `/assets/${a.id}`,
      })),
      ...(pagination.next
        ? {
            next: {
              rel: 'next',
              url: `/api/assets?creatorId=${creatorId}&pageId=${pagination.next}`,
            },
          }
        : {}),
    },
  };
};
