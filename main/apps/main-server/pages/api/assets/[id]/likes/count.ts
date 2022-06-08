import type { NextApiRequest, NextApiResponse } from 'next';
import { getLikesCount } from '@main/rest';
import { ErrorResponse, LikesCountResponse } from '@main/rest-models';
import { z } from 'zod';
import { withErrorResponse } from '@main/next-utils';

const handler = withErrorResponse(
  async (
    req: NextApiRequest,
    res: NextApiResponse<LikesCountResponse | ErrorResponse>
  ) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.query);

    res.status(200).json(await getLikesCount(id));
  }
);

export default handler;
