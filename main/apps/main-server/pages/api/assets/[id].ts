import type { NextApiRequest, NextApiResponse } from 'next';
import { Asset, Response } from '@main/models';
import { getAsset } from '@main/rest';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Asset & Response>
) {
  try {
    const { id } = req.query;

    if (typeof id !== 'string') {
      throw {
        message: 'Something went wrong',
      };
    }

    res.status(200).json(await getAsset(id));
  } catch (e) {
    res.status(403).json(e);
  }
}
