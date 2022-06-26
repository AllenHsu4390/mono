import type { NextApiRequest, NextApiResponse } from 'next';
import { rest } from '@main/rest';
import { CategoriesResponse, DropResponse } from '@main/rest-models';
import { z } from 'zod';
import { ApiHandler, OK, requestTo, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<CategoriesResponse>) => {
      const { id } = z
        .object({
          id: z.string(),
        })
        .parse(req.query);
      res.status(200).json(await rest.assets.param(id).categories.get());
    }
  )
  .withPost(async (req: NextApiRequest, res: NextApiResponse<OK>) => {
    const { name } = z
      .object({
        name: z.string(),
      })
      .parse(req.body);
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.query);

    const userId = await requestTo.userId(req);
    await rest.assets.param(id).categories.post({
      userId,
      name,
    });
    res.status(200).json({ ok: true });
  })
  .engage();

export default handler;
