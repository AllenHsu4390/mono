import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiHandler, OK, requestTo } from '@main/next-utils';
import { saveSession } from '@main/rest';

export const initiateLogout = (res: NextApiResponse) => {
  const cookieValue = `idKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`;
  res.setHeader('Set-Cookie', cookieValue);
};

const handler = new ApiHandler()
  .withErrorResponse()
  .withPost(async (req: NextApiRequest, res: NextApiResponse<OK>) => {
    const userId = await requestTo.userId(req);
    await saveSession(userId);
    initiateLogout(res);
    res.status(200).json({
      ok: true,
    });
  })
  .engage();

export default handler;
