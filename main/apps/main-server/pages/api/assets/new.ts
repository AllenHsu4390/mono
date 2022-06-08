import type { NextApiRequest, NextApiResponse } from 'next';
import { saveAsset, saveCdnData } from '@main/rest';
import { ErrorResponse } from '@main/rest-models';
import { z } from 'zod';
import { withErrorResponse } from '@main/next-utils';

type OK = {
  ok: true;
};

const handler = withErrorResponse(
  async (req: NextApiRequest, res: NextApiResponse<OK | ErrorResponse>) => {
    if (req.method !== 'POST') {
      throw new Error('invalid method');
    }
    const { creatorId } = z
      .object({
        creatorId: z.string(),
      })
      .parse(req.query);
    const { imageData } = z
      .object({
        imageData: z.string(),
      })
      .parse(req.body);

    const cdnAsset = await saveCdnData(imageData);
    await saveAsset(creatorId, cdnAsset.url);

    res.status(200).json({
      ok: true,
    });
  }
);

export default handler;
