import type { NextApiRequest, NextApiResponse } from 'next';
import { rest } from '@main/rest';
import { AssetsResponse } from '@main/rest-models';
import { z } from 'zod';
import { ApiHandler, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<AssetsResponse>) => {
      const { pageId } = z
        .object({
          pageId: z.string(),
        })
        .parse(req.query);

      res.status(200).json(await rest.assets.top.get({ pageId }));
    }
  )
  .engage();

export default handler;
