import type { NextApiRequest, NextApiResponse } from 'next';
import { DailyTopUpResponse, Gain } from '@main/rest-models';
import { ApiHandler, requestTo, withErrorResponse } from '@main/next-utils';
import { environment } from '@main/environment';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withPost(
    async (req: NextApiRequest, res: NextApiResponse<DailyTopUpResponse>) => {
      const userId = await requestTo.userId(req);
      const db = environment.db;

      // mint daily top up
      await db.dailyTopUp.save(userId, Gain.DailyTopUp);

      res.status(200).json({
        hasToppedUp: true,
      });
    }
  )
  .engage();

export default handler;
