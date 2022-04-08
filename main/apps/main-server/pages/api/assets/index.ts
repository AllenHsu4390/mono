import type { NextApiRequest, NextApiResponse } from 'next';
import { Assets, Response } from '@main/models';
import { environment } from '@main/environment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Assets & Response>
) {
  try {
    const db = environment().db;
    const { pageId } = req.query;

    if (typeof pageId !== 'string') {
      throw {
        message: 'Something went wrong',
      };
    }

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

    res.status(200).json({
      ...assets,
      links,
    });
  } catch (e) {
    res.status(403).json(e);
  }
}
