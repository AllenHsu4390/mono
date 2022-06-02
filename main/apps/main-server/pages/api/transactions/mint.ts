import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { getError, getUser, saveDailyTopUp } from '@main/rest';
import { DailyTopUpResponse, ErrorResponse } from '@main/rest-models';

const post = async (
  req,
  res: NextApiResponse<DailyTopUpResponse | ErrorResponse>
) => {
  const { idKey } = req.cookies;
  if (!idKey) {
    throw {
      message: 'Authentication failed',
    };
  }
  const userId = auth().identity.userId(idKey);
  const topup = await saveDailyTopUp(userId);
  res.status(200).json(topup);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DailyTopUpResponse | ErrorResponse>
) {
  try {
    switch (true) {
      case req.method === 'POST':
        await post(req, res);
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
