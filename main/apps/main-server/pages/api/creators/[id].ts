import type { NextApiRequest, NextApiResponse } from 'next';
import { getCreator } from '@main/rest';
import { CreatorResponse, ErrorResponse } from '@main/rest-models';
import { z } from 'zod';
import { ApiHandler, requestTo } from '@main/next-utils';

const handler = new ApiHandler()
  .withErrorResponse()
  .withGet(
    async (
      req: NextApiRequest,
      res: NextApiResponse<CreatorResponse | ErrorResponse>
    ) => {
      const { id } = z
        .object({
          id: z.string(),
        })
        .parse(req.query);
      const user = await requestTo.user(req);
      res.status(200).json(await getCreator(id, user));
    }
  )
  .engage();

export default handler;
