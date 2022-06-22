import type { NextApiRequest, NextApiResponse } from 'next';
import { getCreator } from '@main/rest';
import { CreatorResponse, CreatorResponseSchema } from '@main/rest-models';
import { z } from 'zod';
import { ApiHandler, requestTo, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<CreatorResponse>) => {
      const { id } = z
        .object({
          id: z.string(),
        })
        .parse(req.query);
      const user = await requestTo.user(req);
      res
        .status(200)
        .json(CreatorResponseSchema.parse(await getCreator(id, user)));
    }
  )
  .engage();

export default handler;
