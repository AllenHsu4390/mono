import type { NextApiRequest, NextApiResponse } from 'next';
import { Error, Response, User } from '@main/models';
import { auth } from '@main/auth';
import { getUser } from '@main/rest';

type OK = {
  ok: true;
} & Response;

type UserRes = User & Response;

const me = {
  read: async (req, res: NextApiResponse<UserRes | Error | OK>) => {
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
  res: NextApiResponse<(User & Response) | Error | OK>
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
    res.status(401).json(e);
  }
}
