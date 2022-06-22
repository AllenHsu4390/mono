import type { NextApiRequest, NextApiResponse } from 'next';
import { UserResponse, UserResponseSchema } from '@main/rest-models';
import { ApiHandler, requestTo, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(async (req: NextApiRequest, res: NextApiResponse<UserResponse>) => {
    res.status(200).json(UserResponseSchema.parse(await requestTo.user(req)));
  })
  .engage();

export default handler;
