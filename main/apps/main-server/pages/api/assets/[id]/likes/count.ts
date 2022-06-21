import type { NextApiRequest, NextApiResponse } from 'next';
import { rest } from '@main/rest';
import { LikesCountResponse } from '@main/rest-models';
import { z } from 'zod';
import { ApiHandler } from '@main/next-utils';

const handler = new ApiHandler()
  .withErrorResponse()
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<LikesCountResponse>) => {
      const { id } = z
        .object({
          id: z.string(),
        })
        .parse(req.query);

      res.status(200).json(await rest.likes.count.byAsset(id));
    }
  )
  .engage();

export default handler;
