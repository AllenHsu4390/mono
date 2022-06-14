import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiHandler, OK } from '@main/next-utils';

export const setSession = (res: NextApiResponse) => {
  const cookieValue = `idKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`;

  res.setHeader('Set-Cookie', cookieValue);
};

const logout = async (req: NextApiRequest, res: NextApiResponse<OK>) => {
  setSession(res);
  res.status(200).json({
    ok: true,
  });
};

const handler = new ApiHandler().withErrorResponse().withPost(logout).engage();

export default handler;
