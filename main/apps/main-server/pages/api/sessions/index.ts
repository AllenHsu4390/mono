import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@main/rest';
import { ErrorResponse, SessionResponse } from '@main/rest-models';
import { withErrorResponse } from '@main/next-utils';

const handler = withErrorResponse(
  async (
    req: NextApiRequest,
    res: NextApiResponse<SessionResponse | ErrorResponse>
  ) => {
    res.status(200).json(await getSession());
  }
);

export default handler;
