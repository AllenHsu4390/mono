import type { NextApiRequest, NextApiResponse } from 'next';
import { getAsset, getError } from '@main/rest';
import { AssetResponse, ErrorResponse } from '@main/rest-models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AssetResponse | ErrorResponse>
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
    const error = getError(e);
    res.status(error.status).json(error);
  }
}
