import type { NextApiRequest, NextApiResponse } from 'next';
import { getAssets, getError } from '@main/rest';
import { AssetsResponse, ErrorResponse } from '@main/rest-models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AssetsResponse | ErrorResponse>
) {
  try {
    const { pageId, creatorId } = req.query;

    if (typeof creatorId !== 'string') {
      throw {
        message: 'Something went wrong',
      };
    }

    if (typeof pageId !== 'string') {
      throw {
        message: 'Something went wrong',
      };
    }

    res.status(200).json(await getAssets(creatorId, pageId));
  } catch (e) {
    const error = getError(e);
    res.status(error.status).json(error);
  }
}
