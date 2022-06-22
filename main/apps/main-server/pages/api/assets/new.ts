import type { NextApiRequest, NextApiResponse } from 'next';
import { rest } from '@main/rest';
import { z } from 'zod';
import { ApiHandler, OK, requestTo, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withPost(async (req: NextApiRequest, res: NextApiResponse<OK>) => {
    const { imageData } = z
      .object({
        imageData: z.string(),
      })
      .parse(req.body);

    const user = await requestTo.user(req);
    await rest.assets.new(user, imageData);

    res.status(200).json({
      ok: true,
    });
  })
  .engage();

export default handler;
