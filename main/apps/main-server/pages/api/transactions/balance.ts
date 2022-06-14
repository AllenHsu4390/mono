import type { NextApiRequest, NextApiResponse } from 'next';
import { getBalance } from '@main/rest';
import { BalanceResponse } from '@main/rest-models';
import { ApiHandler, requestTo } from '@main/next-utils';

const handler = new ApiHandler()
  .withErrorResponse()
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<BalanceResponse>) => {
      const userId = await requestTo.userId(req);
      const balance = await getBalance(userId);
      res.status(200).json(balance);
    }
  )
  .engage();

export default handler;
