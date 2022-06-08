import type { NextApiRequest, NextApiResponse } from 'next';
import { getAssets } from '@main/rest';
import { AssetsResponse, ErrorResponse } from '@main/rest-models';
import { z } from 'zod';
import { withErrorResponse } from '@main/next-utils';

const handler = withErrorResponse(
  async (
    req: NextApiRequest,
    res: NextApiResponse<AssetsResponse | ErrorResponse>
  ) => {
    const { pageId, creatorId } = z
      .object({
        pageId: z.string(),
        creatorId: z.string(),
      })
      .parse(req.query);

    res.status(200).json(await getAssets(creatorId, pageId));
  }
);

export default handler;
