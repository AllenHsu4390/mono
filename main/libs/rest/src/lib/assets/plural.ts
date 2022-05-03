import { environment } from '@main/environment';
import { Assets, Response } from '@main/models';

export const getAssets = async (
  creatorId: string,
  pageId: string
): Promise<Assets & Response> => {
  const db = environment.db;
  const assets = await db.get.assets(creatorId, pageId);

  const links = [
    ...assets.assets.map((a) => ({
      rel: 'asset',
      url: `/assets/${a.id}`,
    })),
    ...(assets.pagination.next
      ? [
          {
            rel: 'next',
            url: `/api/assets?creatorId=${creatorId}&pageId=${assets.pagination.next}`,
          },
        ]
      : []),
  ];

  return {
    ...assets,
    links,
  };
};
