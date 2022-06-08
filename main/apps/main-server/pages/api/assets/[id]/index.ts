import type { NextApiRequest, NextApiResponse } from 'next';
import { getAsset } from '@main/rest';
import { AssetResponse, ErrorResponse } from '@main/rest-models';
import { z } from 'zod';
import { withErrorResponse } from '@main/next-utils';

const handler = withErrorResponse(
  async (
    req: NextApiRequest,
    res: NextApiResponse<AssetResponse | ErrorResponse>
  ) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.query);

    res.status(200).json(await getAsset(id));
  }
);

export default handler;
