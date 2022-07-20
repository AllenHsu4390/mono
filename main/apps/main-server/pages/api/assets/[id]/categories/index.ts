import type { NextApiRequest, NextApiResponse } from 'next';
import { CategoriesResponse, DropResponse } from '@main/rest-models';
import { z } from 'zod';
import { ApiHandler, OK, requestTo, withErrorResponse } from '@main/next-utils';
import { environment } from '@main/environment';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<CategoriesResponse>) => {
      const { id: assetId } = z
        .object({
          id: z.string(),
        })
        .parse(req.query);
      const { db } = environment;

      const categories = await db.category.get(assetId);

      res.status(200).json({
        categories,
      });
    }
  )
  .withPost(async (req: NextApiRequest, res: NextApiResponse<OK>) => {
    const { name } = z
      .object({
        name: z.string(),
      })
      .parse(req.body);
    const { id: assetId } = z
      .object({
        id: z.string(),
      })
      .parse(req.query);

    const userId = await requestTo.userId(req);
    const { db } = environment;

    await db.category.save(userId, assetId, name);
    res.status(200).json({ ok: true });
  })
  .engage();

export default handler;
