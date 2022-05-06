import type { NextApiRequest, NextApiResponse } from 'next';
import { getError, getTopAssets } from '@main/rest';
import { AssetsResponse, ErrorResponse } from '@main/rest-models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AssetsResponse | ErrorResponse>
) {
  try {
    const { pageId } = req.query;

    if (typeof pageId !== 'string') {
      throw {
        message: 'Something went wrong',
      };
    }

    res.status(200).json(await getTopAssets(pageId));
  } catch (e) {
    const error = getError(e);
    res.status(error.status).json(error);
  }
}
