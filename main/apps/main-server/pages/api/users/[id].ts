import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { getError, getUser } from '@main/rest';
import { ErrorResponse, UserResponse } from '@main/rest-models';
import { setSession } from '../logout';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse | ErrorResponse>
) {
  const { id } = req.query;
  try {
    if (req.method === 'GET' && id === 'me') {
      const { idKey } = req.cookies;
      if (!idKey) {
        throw {
          message: 'Authentication failed',
        };
      }
      const userId = auth().identity.userId(idKey);
      const user = await getUser(userId);
      res.status(200).json(user);
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
