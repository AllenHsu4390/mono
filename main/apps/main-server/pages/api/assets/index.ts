import type { NextApiRequest, NextApiResponse } from 'next';
import { Assets } from '@main/models';
import { environment } from '@main/environment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Assets>
) {
  try {
    const db = environment().db;
    const { pageId } = req.query;

    if (typeof pageId !== 'string') {
      throw {
        message: 'Something went wrong',
      };
    }

    res.status(200).json(await db.get.assets(pageId));
  } catch (e) {
    res.status(403).json(e);
  }
}
