import type { NextApiRequest, NextApiResponse } from 'next';
import { saveAsset } from '@main/rest';
import { z } from 'zod';
import { ApiHandler, OK, requestTo } from '@main/next-utils';

const handler = new ApiHandler()
  .withErrorResponse()
  .withPost(async (req: NextApiRequest, res: NextApiResponse<OK>) => {
    const { creatorId } = z
      .object({
        creatorId: z.string(),
      })
      .parse(req.query);
    const { imageData } = z
      .object({
        imageData: z.string(),
      })
      .parse(req.body);

    const user = await requestTo.user(req);
    await saveAsset(creatorId, imageData, user);

    res.status(200).json({
      ok: true,
    });
  })
  .engage();

export default handler;
