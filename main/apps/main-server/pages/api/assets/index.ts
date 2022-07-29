import type { NextApiRequest, NextApiResponse } from 'next';
import { AssetsResponse, SaveAssetResultResponse } from '@main/rest-models';
import { z } from 'zod';
import {
  ApiHandler,
  getAssetsResponse,
  requestTo,
  withErrorResponse,
} from '@main/next-utils';
import { environment } from '@main/environment';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const getCdnData = (cdnToken: string) => {
  if (process.env.NODE_ENV === 'development') {
    return `https://source.unsplash.com/collection/${getRandomInt(10000)}`;
  }

  // lookup cdn token
  return '';
};

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<AssetsResponse>) => {
      const { pageId, creatorId } = z
        .object({
          pageId: z.string().optional(),
          creatorId: z.string(),
        })
        .parse(req.query);

      res.status(200).json(await getAssetsResponse(creatorId, pageId));
    }
  )
  .withPost(
    async (
      req: NextApiRequest,
      res: NextApiResponse<SaveAssetResultResponse>
    ) => {
      const { cdnToken } = z
        .object({
          cdnToken: z.string(),
        })
        .parse(req.body);

      const user = await requestTo.user(req);

      const { db } = environment;

      const savedAsset = await db.asset.save(
        user.creatorId,
        getCdnData(cdnToken)
      );

      res.status(200).json({
        id: savedAsset.id,
        links: {
          asset: `/assets/${savedAsset.id}`,
        },
      });
    }
  )
  .engage();

export default handler;
