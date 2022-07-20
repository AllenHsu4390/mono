import type { NextApiRequest, NextApiResponse } from 'next';
import { AssetResponse } from '@main/rest-models';
import { z } from 'zod';
import {
  ApiHandler,
  getAssetResponse,
  requestTo,
  withErrorResponse,
} from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(async (req: NextApiRequest, res: NextApiResponse<AssetResponse>) => {
    const { id: assetId } = z
      .object({
        id: z.string(),
      })
      .parse(req.query);

    const user = await requestTo.userOrNull(req);

    res.status(200).json(await getAssetResponse(assetId, user));
  })
  .engage();

export default handler;
