import type { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '@main/rest';
import { ErrorResponse, UserResponse } from '@main/rest-models';
import { z } from 'zod';
import { auth } from '@main/auth';
import { withErrorResponse } from '@main/next-utils';

const handler = withErrorResponse(
  async (
    req: NextApiRequest,
    res: NextApiResponse<UserResponse | ErrorResponse>
  ) => {
    const { idKey } = z
      .object({
        idKey: z.string(),
      })
      .parse(req.cookies);
    const userId = auth().identity.userId(idKey);
    res.status(200).json(await getUser(userId));
  }
);

export default handler;
