import type { NextApiRequest, NextApiResponse } from 'next';
import { LikesCountResponse } from '@main/rest-models';
import { z } from 'zod';
import { ApiHandler, withErrorResponse } from '@main/next-utils';
import { environment } from '@main/environment';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<LikesCountResponse>) => {
      const { id: assetId } = z
        .object({
          id: z.string(),
        })
        .parse(req.query);

      const { db, cache } = environment;
      const likesCount = await cache.likesCount.get(
        assetId,
        async () => await db.likesCount.get(assetId)
      );
      res.status(200).json({
        count: likesCount,
      });
    }
  )
  .engage();

export default handler;
