import { environment } from '@main/environment';
import { Assets } from '@main/models';
import { AssetsResponse } from '../responses';

export const getAssets = async (
  pageId: string
): Promise<Assets & AssetsResponse> => {
  const db = environment().db;
  const assets = await db.get.assets(pageId);

  const links = [
    ...assets.assets.map((a) => ({
      rel: 'asset',
      url: `/0/assets/${a.id}`,
    })),

    ...(assets.pagination.next
      ? [
          {
            rel: 'next',
            url: `/api/assets?pageId=${assets.pagination.next}`,
          },
        ]
      : []),
  ];

  return {
    ...assets,
    links,
  };
};
