import type { NextApiRequest, NextApiResponse } from 'next';
import { saveDailyTopUp } from '@main/rest';
import { DailyTopUpResponse } from '@main/rest-models';
import { ApiHandler, requestTo, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withPost(
    async (req: NextApiRequest, res: NextApiResponse<DailyTopUpResponse>) => {
      const userId = await requestTo.userId(req);
      const topup = await saveDailyTopUp(userId);
      res.status(200).json(topup);
    }
  )
  .engage();

export default handler;
