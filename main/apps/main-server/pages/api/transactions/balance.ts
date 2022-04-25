import type { NextApiRequest, NextApiResponse } from 'next';
import { Balance, Error, Response, User } from '@main/models';
import { auth } from '@main/auth';
import { getBalance } from '@main/rest';

const get = async (req, res: NextApiResponse<(Balance & Response) | Error>) => {
  const { idKey } = req.cookies;
  if (!idKey) {
    throw {
      message: 'Authentication failed',
    };
  }
  const userId = auth().identity.userId(idKey);
  const balance = await getBalance(userId);
  res.status(200).json(balance);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<(Balance & Response) | Error>
) {
  try {
    switch (true) {
      case req.method === 'GET':
        await get(req, res);
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
