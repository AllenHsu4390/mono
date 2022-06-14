import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@main/rest';
import { SessionResponse } from '@main/rest-models';
import { ApiHandler } from '@main/next-utils';

const handler = new ApiHandler()
  .withErrorResponse()
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<SessionResponse>) => {
      res.status(200).json(await getSession());
    }
  )
  .engage();

export default handler;
