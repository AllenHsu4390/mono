import type { NextApiRequest, NextApiResponse } from 'next';
import { rest } from '@main/rest';
import { DropResponse } from '@main/rest-models';
import { z } from 'zod';
import { ApiHandler, requestTo, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withPost(async (req: NextApiRequest, res: NextApiResponse<DropResponse>) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.query);

    const userId = await requestTo.userId(req);

    const drop = await rest.assets.param(id).likes.post({
      userId,
    });

    res.status(200).json(drop);
  })
  .engage();

export default handler;
