import type { NextApiRequest, NextApiResponse } from 'next';
import { rest } from '@main/rest';
import { ApiHandler, OK, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(async (req: NextApiRequest, res: NextApiResponse<OK>) => {
    if (process.env.NODE_ENV === 'development') {
      rest.init.dev();
      res.status(200).json({
        ok: true,
      });
      return;
    }

    throw new Error('Wrong Env');
  })
  .engage();

export default handler;
