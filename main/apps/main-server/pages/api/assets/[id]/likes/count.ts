import type { NextApiRequest, NextApiResponse } from 'next';
import { getError, getLikesCount } from '@main/rest';
import { ErrorResponse, LikesCountResponse } from '@main/rest-models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikesCountResponse | ErrorResponse>
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
    const error = getError(e);
    res.status(error.status).json(error);
  }
}
