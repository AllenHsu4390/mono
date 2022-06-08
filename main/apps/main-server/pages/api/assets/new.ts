import type { NextApiRequest, NextApiResponse } from 'next';
import { saveAsset } from '@main/rest';
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

    const { creatorId, src } = z
      .object({
        creatorId: z.string(),
        src: z.string(),
      })
      .parse(req.body);

    await saveAsset(creatorId, src);

    res.status(200).json({
      ok: true,
    });
  }
);

export default handler;
