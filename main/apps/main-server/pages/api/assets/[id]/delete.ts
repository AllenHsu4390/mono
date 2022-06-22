import type { NextApiRequest, NextApiResponse } from 'next';
import { rest } from '@main/rest';
import { z } from 'zod';
import { ApiHandler, OK, requestTo, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withPost(async (req: NextApiRequest, res: NextApiResponse<OK>) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.query);

    const user = await requestTo.user(req);
    await rest.assets.delete(id, user.creatorId);
    res.status(200).json({
      ok: true,
    });
  })
  .engage();

export default handler;
