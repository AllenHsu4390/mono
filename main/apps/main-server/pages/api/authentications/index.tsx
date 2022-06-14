import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { getUser } from '@main/rest';
import { ErrorResponse } from '@main/rest-models';
import { z } from 'zod';
import { ApiHandler, withErrorResponse } from '@main/next-utils';

const setSession = (res: NextApiResponse, encryptedUserId: string) => {
  const cookieValue = `idKey=${encryptedUserId}; SameSite=Strict; Secure; Path=/; Max-Age=25920000; HttpOnly;`;
  res.setHeader('Set-Cookie', cookieValue);
};

const handler = new ApiHandler()
  .withErrorResponse()
  .withGet(async (req: NextApiRequest, res: NextApiResponse<ErrorResponse>) => {
    const { u, iv } = z
      .object({
        u: z.string(),
        iv: z.string(),
      })
      .parse(req.query);
    const user = await getUser(auth().identity.userId([u, iv].join('|')));
    setSession(res, auth().identity.encryptedUserId(user.id));
    res.redirect('/');
  })
  .engage();

export default handler;
