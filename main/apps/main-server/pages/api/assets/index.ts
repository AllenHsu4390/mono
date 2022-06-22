import type { NextApiRequest, NextApiResponse } from 'next';
import { rest } from '@main/rest';
import { AssetsResponse, AssetsResponseSchema } from '@main/rest-models';
import { z } from 'zod';
import { ApiHandler, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<AssetsResponse>) => {
      const { pageId, creatorId } = z
        .object({
          pageId: z.string(),
          creatorId: z.string(),
        })
        .parse(req.query);

      res
        .status(200)
        .json(
          AssetsResponseSchema.parse(
            await rest.assets.byCreator(creatorId, pageId)
          )
        );
    }
  )
  .engage();

export default handler;
