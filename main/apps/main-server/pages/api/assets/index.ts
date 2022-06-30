import type { NextApiRequest, NextApiResponse } from 'next';
import { rest } from '@main/rest';
import { AssetsResponse } from '@main/rest-models';
import { z } from 'zod';
import { ApiHandler, OK, requestTo, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<AssetsResponse>) => {
      const { pageId, creatorId } = z
        .object({
          pageId: z.string(),
          creatorId: z.string(),
        })
        .parse(req.query);

      res.status(200).json(
        await rest.creators.param(creatorId).assets.get({
          pageId,
        })
      );
    }
  )
  .withPost(async (req: NextApiRequest, res: NextApiResponse<OK>) => {
    const { cdnToken } = z
      .object({
        cdnToken: z.string(),
      })
      .parse(req.body);

    const user = await requestTo.user(req);

    await rest.assets.post({
      creatorId: user.creatorId,
      cdnToken,
    });

    res.status(200).json({
      ok: true,
    });
  })
  .engage();

export default handler;
