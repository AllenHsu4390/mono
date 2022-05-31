import { environment } from '@main/environment';
import { AssetsResponse } from '@main/rest-models';

export const getTopAssets = async (pageId: string): Promise<AssetsResponse> => {
  const db = environment.db;
  const { assets, pagination } = await db.get.topAssets(pageId);

  return {
    assets,
    pagination,
    links: {
      assets: assets.map((a) => ({
        rel: 'assets',
        url: `/assets/${a.id}`,
      })),
      ...(pagination.next
        ? {
            next: {
              rel: 'next',
              url: `/api/assets/top?pageId=${pagination.next}`,
            },
          }
        : {}),
    },
  };
};
