import type { NextApiRequest, NextApiResponse } from 'next';
import { Asset } from '@main/models';
import { environment } from '@main/environment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Asset>
) {
  try {
    const db = environment().db;
    const { id } = req.query;

    if (typeof id !== 'string') {
      throw {
        message: 'Something went wrong',
      };
    }

    res.status(200).json(await db.get.asset(id));
  } catch (e) {
    res.status(403).json(e);
  }
}
