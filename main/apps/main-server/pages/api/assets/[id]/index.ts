import type { NextApiRequest, NextApiResponse } from 'next';
import { getAsset } from '@main/rest';
import { AssetResponse } from '@main/rest-models';
import { z } from 'zod';
import { ApiHandler, requestTo } from '@main/next-utils';

const handler = new ApiHandler()
  .withErrorResponse()
  .withGet(async (req: NextApiRequest, res: NextApiResponse<AssetResponse>) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.query);

    const user = await requestTo.userOrNull(req);

    res.status(200).json(await getAsset(id, user));
  })
  .engage();

export default handler;
