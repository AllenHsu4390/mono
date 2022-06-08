import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { getBalance } from '@main/rest';
import { BalanceResponse, ErrorResponse } from '@main/rest-models';
import { z } from 'zod';
import { withErrorResponse } from '@main/next-utils';

const get = async (
  req,
  res: NextApiResponse<BalanceResponse | ErrorResponse>
) => {
  const { idKey } = z
    .object({
      idKey: z.string(),
    })
    .parse(req.cookies);
  const userId = auth().identity.userId(idKey);
  const balance = await getBalance(userId);
  res.status(200).json(balance);
};

const handler = withErrorResponse(
  async (
    req: NextApiRequest,
    res: NextApiResponse<BalanceResponse | ErrorResponse>
  ) => {
    switch (true) {
      case req.method === 'GET':
        await get(req, res);
        break;
      default:
        throw {
          message: 'Invalid operation',
        };
    }
  }
);

export default handler;
