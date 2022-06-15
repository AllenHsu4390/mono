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
      const userId = await requestTo.userId(req);
      res.status(200).json(await getUser(userId));
    }
  )
  .engage();

export default handler;
