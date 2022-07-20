import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { ApiHandler, OK, requestTo, withErrorResponse } from '@main/next-utils';
import { environment } from '@main/environment';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withPost(async (req: NextApiRequest, res: NextApiResponse<OK>) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.query);

    const user = await requestTo.user(req);
    const { db } = environment;
    await db.asset.delete(id, user.creatorId);
    res.status(200).json({
      ok: true,
    });
  })
  .engage();

export default handler;
