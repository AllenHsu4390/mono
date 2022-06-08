import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { saveDailyTopUp } from '@main/rest';
import { DailyTopUpResponse, ErrorResponse } from '@main/rest-models';
import { z } from 'zod';
import { withErrorResponse } from '@main/next-utils';

const post = async (
  req,
  res: NextApiResponse<DailyTopUpResponse | ErrorResponse>
) => {
  const { idKey } = z
    .object({
      idKey: z.string(),
    })
    .parse(req.cookies);
  const userId = auth().identity.userId(idKey);
  const topup = await saveDailyTopUp(userId);
  res.status(200).json(topup);
};

const handler = withErrorResponse(
  async (
    req: NextApiRequest,
    res: NextApiResponse<DailyTopUpResponse | ErrorResponse>
  ) => {
    switch (true) {
      case req.method === 'POST':
        await post(req, res);
        break;
      default:
        throw {
          message: 'Invalid operation',
        };
    }
  }
);

export default handler;
