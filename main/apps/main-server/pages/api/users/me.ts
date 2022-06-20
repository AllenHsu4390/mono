import type { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '@main/rest';
import { ErrorResponse, UserResponse } from '@main/rest-models';
import { ApiHandler, requestTo } from '@main/next-utils';

const handler = new ApiHandler()
  .withErrorResponse()
  .withGet(
    async (
      req: NextApiRequest,
      res: NextApiResponse<UserResponse | ErrorResponse>
    ) => {
      res.status(200).json(await requestTo.user(req));
    }
  )
  .engage();

export default handler;
