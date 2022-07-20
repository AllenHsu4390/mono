import type { NextApiRequest, NextApiResponse } from 'next';
import {
  ApiHandler,
  getGuestResponse,
  withErrorResponse,
} from '@main/next-utils';
import { GuestResponse } from '@main/rest-models';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(async (req: NextApiRequest, res: NextApiResponse<GuestResponse>) => {
    res.status(200).json(getGuestResponse());
  })
  .engage();

export default handler;
