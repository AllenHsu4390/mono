import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiHandler } from '@main/next-utils';
import { GuestResponse } from '@main/rest-models';
import { getGuest } from '@main/rest';

const handler = new ApiHandler()
  .withErrorResponse()
  .withGet(async (req: NextApiRequest, res: NextApiResponse<GuestResponse>) => {
    res.status(200).json(getGuest());
  })
  .engage();

export default handler;
