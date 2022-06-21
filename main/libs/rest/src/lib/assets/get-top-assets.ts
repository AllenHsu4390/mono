import { environment } from '@main/environment';
import { AssetsResponse } from '@main/rest-models';

export const getTopAssets = async (pageId: string): Promise<AssetsResponse> => {
  const db = environment.db;
  const { assets, pagination } = await db.topAssets.get(pageId);

  return {
    assets,
    pagination,
    links: {
      assets: assets.map((a) => `/assets/${a.id}`),
      ...(pagination.next
        ? {
            next: `/api/assets/top?pageId=${pagination.next}`,
          }
        : {}),
    },
  };
};
