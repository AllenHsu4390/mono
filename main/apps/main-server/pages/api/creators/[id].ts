import type { NextApiRequest, NextApiResponse } from 'next';
import { Creator } from '@main/models';
import { Error } from '@main/models';
import { environment } from '@main/environment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Creator | Error>
) {
  const { id } = req.query;
  const db = environment().db;
  try {
    if (typeof id !== 'string') {
      throw {
        message: 'Something went wrong',
      };
    }
    res.status(200).json(await db.get.creator(id));
  } catch (e) {
    res.status(403).json(e);
  }
}
