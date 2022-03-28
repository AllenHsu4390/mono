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
  if (typeof id !== 'string') {
    res.status(403).json({
      message: 'Something went wrong',
    });
  } else {
    res.status(200).json(await new db.Creator(id).get());
  }
}
