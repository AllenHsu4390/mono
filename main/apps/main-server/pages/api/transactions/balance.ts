import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { getBalance, getError } from '@main/rest';
import { BalanceResponse, ErrorResponse } from '@main/rest-models';

const get = async (
  req,
  res: NextApiResponse<BalanceResponse | ErrorResponse>
) => {
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
  res: NextApiResponse<BalanceResponse | ErrorResponse>
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
    const error = getError(e);
    res.status(error.status).json(error);
  }
}
