import type { NextApiRequest, NextApiResponse } from 'next';
import { Assets, Response } from '@main/models';
import { getAssets } from '@main/rest';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Assets & Response>
) {
  try {
    const { pageId } = req.query;

    if (typeof pageId !== 'string') {
      throw {
        message: 'Something went wrong',
      };
    }

    res.status(200).json(await getAssets(pageId));
  } catch (e) {
    res.status(403).json(e);
  }
}
