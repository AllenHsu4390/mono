import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession, getUser, saveSession } from '@main/rest';
import { SessionResponse } from '@main/rest-models';
import { ApiHandler, OK } from '@main/next-utils';
import { z } from 'zod';
import { auth } from '@main/auth';

const authorizeLogin = (res: NextApiResponse, userId: string) => {
  const encryptedUserId = auth().identity.encryptedUserId(userId);
  const cookieValue = `idKey=${encryptedUserId}; authToken=deleted; SameSite=Strict; Secure; Path=/; Max-Age=25920000; HttpOnly;`;
  res.setHeader('Set-Cookie', cookieValue);
};

const handler = new ApiHandler()
  .withErrorResponse()
  .withPost(async (req: NextApiRequest, res: NextApiResponse<OK>) => {
    const { u, iv } = z
      .object({
        u: z.string(),
        iv: z.string(),
      })
      .parse(req.query);
    const user = await getUser(auth().identity.userId([u, iv].join('|')));
    saveSession(user.id);
    res.status(200).json({
      ok: true,
    });
  })
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<SessionResponse>) => {
      const { u, iv } = z
        .object({
          u: z.string().optional(),
          iv: z.string().optional(),
        })
        .parse(req.query);

      if (!u || !iv) {
        res.status(200).json(await getSession());
        return;
      }
      const user = await getUser(auth().identity.userId([u, iv].join('|')));
      const userId = user.id;
      const session = await getSession(userId);
      if (session.isLoggedIn) {
        authorizeLogin(res, userId);
      }
      res.status(200).json(session);
    }
  )
  .engage();

export default handler;
