import type { NextApiRequest, NextApiResponse } from 'next';
import { LikesCount, Response } from '@main/models';
import { getLikesCount } from '@main/rest';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikesCount & Response>
) {
  try {
    const { id } = req.query;

    if (typeof id !== 'string') {
      throw {
        message: 'Something went wrong',
      };
    }

    res.status(200).json(await getLikesCount(id));
  } catch (e) {
    res.status(403).json(e);
  }
}
