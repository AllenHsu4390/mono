import type { NextApiRequest, NextApiResponse } from 'next';
import { CreatorResponse } from '@main/rest-models';
import { z } from 'zod';
import {
  ApiHandler,
  getCreatorResponse,
  requestTo,
  withErrorResponse,
} from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<CreatorResponse>) => {
      const { id: creatorId } = z
        .object({
          id: z.string(),
        })
        .parse(req.query);
      const user = await requestTo.userOrNull(req);
      res.status(200).json(await getCreatorResponse(creatorId, user));
    }
  )
  .engage();

export default handler;
