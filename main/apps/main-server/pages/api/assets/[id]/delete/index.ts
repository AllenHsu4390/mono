import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteAsset } from '@main/rest';
import { z } from 'zod';
import { ApiHandler, OK, requestTo } from '@main/next-utils';

const handler = new ApiHandler()
  .withErrorResponse()
  .withPost(async (req: NextApiRequest, res: NextApiResponse<OK>) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.query);

    const user = await requestTo.user(req);
    await deleteAsset(id, user.creatorId);
    res.status(200).json({
      ok: true,
    });
  })
  .engage();

export default handler;
