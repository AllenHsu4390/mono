import type { NextApiRequest, NextApiResponse } from 'next';
import { saveLike } from '@main/rest';
import { auth } from '@main/auth';
import { DropResponse, ErrorResponse } from '@main/rest-models';
import { z } from 'zod';
import { withErrorResponse } from '@main/next-utils';

const handler = withErrorResponse(
  async (
    req: NextApiRequest,
    res: NextApiResponse<DropResponse | ErrorResponse>
  ) => {
    const { idKey } = z
      .object({
        idKey: z.string(),
      })
      .parse(req.cookies);
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.query);

    const userId = auth().identity.userId(idKey);

    if (req.method !== 'POST') {
      throw {
        message: 'Invalid method',
      };
    }

    const drop = await saveLike({
      userId,
      assetId: id,
    });

    res.status(200).json(drop);
  }
);

export default handler;
