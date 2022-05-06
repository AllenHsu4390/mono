import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { getError, getUser } from '@main/rest';
import { ErrorResponse, UserResponse } from '@main/rest-models';

const me = {
  read: async (req, res: NextApiResponse<UserResponse | ErrorResponse>) => {
    const { idKey } = req.cookies;
    if (!idKey) {
      throw {
        message: 'Authentication failed',
      };
    }
    const userId = auth().identity.userId(idKey);
    const user = await getUser(userId);
    res.status(200).json(user);
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse | ErrorResponse>
) {
  const { id } = req.query;
  try {
    switch (true) {
      case req.method === 'GET' && id === 'me':
        await me.read(req, res);
        break;
      default:
        throw {
          message: 'Invalid operation',
        };
    }
  } catch (e) {
    const error = getError(e);
    res.status(error.status).json(error);
  }
}
