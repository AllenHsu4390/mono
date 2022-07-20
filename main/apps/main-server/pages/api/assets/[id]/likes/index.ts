import type { NextApiRequest, NextApiResponse } from 'next';
import { Cost, DropResponse } from '@main/rest-models';
import { z } from 'zod';
import { ApiHandler, requestTo, withErrorResponse } from '@main/next-utils';
import { environment } from '@main/environment';

const dropRate = ({ pctChance } = { pctChance: 0.02 }) => {
  return Math.random() < pctChance;
};

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withPost(async (req: NextApiRequest, res: NextApiResponse<DropResponse>) => {
    const { id: assetId } = z
      .object({
        id: z.string(),
      })
      .parse(req.query);

    const userId = await requestTo.userId(req);
    const like = {
      userId,
      assetId,
    };
    const { db, cache } = environment;

    await db.like.save(like.userId, like.assetId, Cost.Like);

    await cache.likesCount.save(like.assetId, (prevCount) => {
      return prevCount + 1;
    });

    await cache.balance.save(like.userId, (prevBalance) => {
      return prevBalance - Cost.Like;
    });

    res.status(200).json({
      isDropped: dropRate(),
      assetId: like.assetId,
    });
  })
  .engage();

export default handler;
