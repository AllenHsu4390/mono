import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiHandler, OK, requestTo } from '@main/next-utils';
import { deleteSession } from '@main/rest';

export const initiateLogout = (res: NextApiResponse) => {
  res.setHeader('Set-Cookie', [
    `idKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`,
    `sessionKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`,
  ]);
};

const handler = new ApiHandler()
  .withErrorResponse()
  .withPost(async (req: NextApiRequest, res: NextApiResponse<OK>) => {
    const sessionId = await requestTo.sessionId(req);
    await deleteSession(sessionId);
    initiateLogout(res);
    res.status(200).json({
      ok: true,
    });
  })
  .engage();

export default handler;
