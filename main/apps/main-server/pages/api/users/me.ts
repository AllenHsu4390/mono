import type { NextApiRequest, NextApiResponse } from 'next';
import { UserResponse } from '@main/rest-models';
import { ApiHandler, requestTo, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(async (req: NextApiRequest, res: NextApiResponse<UserResponse>) => {
    res.status(200).json(await requestTo.user(req));
  })
  .engage();

export default handler;
