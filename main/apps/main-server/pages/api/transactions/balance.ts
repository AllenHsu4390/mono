import type { NextApiRequest, NextApiResponse } from 'next';
import { BalanceResponse } from '@main/rest-models';
import { ApiHandler, requestTo, withErrorResponse } from '@main/next-utils';
import { environment } from '@main/environment';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<BalanceResponse>) => {
      const userId = await requestTo.userId(req);
      const { cache, db } = environment;
      const sum = await cache.balance.get(
        userId,
        async () => await db.balance.get(userId)
      );
      res.status(200).json({
        sum,
      });
    }
  )
  .engage();

export default handler;
