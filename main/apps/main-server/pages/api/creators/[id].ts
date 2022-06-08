import type { NextApiRequest, NextApiResponse } from 'next';
import { getCreator } from '@main/rest';
import { CreatorResponse, ErrorResponse } from '@main/rest-models';
import { z } from 'zod';
import { withErrorResponse } from '@main/next-utils';

const handler = withErrorResponse(
  async (
    req: NextApiRequest,
    res: NextApiResponse<CreatorResponse | ErrorResponse>
  ) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.query);

    res.status(200).json(await getCreator(id));
  }
);

export default handler;
