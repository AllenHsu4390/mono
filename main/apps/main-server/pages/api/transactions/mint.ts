import type { NextApiRequest, NextApiResponse } from 'next';
import { rest } from '@main/rest';
import { DailyTopUpResponse } from '@main/rest-models';
import { ApiHandler, requestTo, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withPost(
    async (req: NextApiRequest, res: NextApiResponse<DailyTopUpResponse>) => {
      const userId = await requestTo.userId(req);
      res.status(200).json(await rest.users.param(userId).dailyTopUp.post());
    }
  )
  .engage();

export default handler;
