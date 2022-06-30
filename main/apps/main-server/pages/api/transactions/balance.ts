import type { NextApiRequest, NextApiResponse } from 'next';
import { rest } from '@main/rest';
import { BalanceResponse } from '@main/rest-models';
import { ApiHandler, requestTo, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<BalanceResponse>) => {
      const userId = await requestTo.userId(req);
      const balance = await rest.users.param(userId).balance.get();
      res.status(200).json(balance);
    }
  )
  .engage();

export default handler;
