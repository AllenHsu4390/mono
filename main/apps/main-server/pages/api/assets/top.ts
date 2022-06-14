import type { NextApiRequest, NextApiResponse } from 'next';
import { getTopAssets } from '@main/rest';
import { AssetsResponse, ErrorResponse } from '@main/rest-models';
import { z } from 'zod';
import { ApiHandler } from '@main/next-utils';

const handler = new ApiHandler()
  .withErrorResponse()
  .withGet(
    async (
      req: NextApiRequest,
      res: NextApiResponse<AssetsResponse | ErrorResponse>
    ) => {
      const { pageId } = z
        .object({
          pageId: z.string(),
        })
        .parse(req.query);

      res.status(200).json(await getTopAssets(pageId));
    }
  )
  .engage();

export default handler;
