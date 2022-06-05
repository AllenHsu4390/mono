import type { NextApiRequest, NextApiResponse } from 'next';
import { getError, requestTo } from '@main/rest';
import { ErrorResponse, UserResponse } from '@main/rest-models';
import { setSession } from '../logout';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse | ErrorResponse>
) {
  const { id } = req.query;
  try {
    if (req.method === 'GET' && id === 'me') {
      res.status(200).json(await requestTo.user(req));
    } else {
      throw {
        message: 'Invalid operation',
      };
    }
  } catch (e) {
    const error = getError(e);
    setSession(res);
    res.status(error.status).json(error);
  }
}
