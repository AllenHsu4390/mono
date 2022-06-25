import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiHandler, withErrorResponse } from '@main/next-utils';
import { GuestResponse } from '@main/rest-models';
import { rest } from '@main/rest';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(async (req: NextApiRequest, res: NextApiResponse<GuestResponse>) => {
    res.status(200).json(rest.guests.start.get());
  })
  .engage();

export default handler;
