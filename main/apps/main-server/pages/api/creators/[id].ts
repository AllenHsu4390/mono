import type { NextApiRequest, NextApiResponse } from 'next';
import { Creator, Response } from '@main/models';
import { Error } from '@main/models';
import { getCreator } from '@main/rest';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<(Creator & Response) | Error>
) {
  const { id } = req.query;
  try {
    if (typeof id !== 'string') {
      throw {
        message: 'Something went wrong',
      };
    }
    res.status(200).json(await getCreator(id));
  } catch (e) {
    res.status(403).json(e);
  }
}
