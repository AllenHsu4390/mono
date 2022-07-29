import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiHandler, OK, withErrorResponse } from '@main/next-utils';
import { z } from 'zod';
import { auth } from '@main/auth';
import { SessionResponse } from '@main/rest-models';
import { environment } from '@main/environment';

const addAuthHeaders = (
  res: NextApiResponse,
  userId: string,
  sessionId: string
) => {
  const encryptedUserId = auth.encrypt(userId);
  const encryptedSessionId = auth.encrypt(sessionId);
  res.setHeader('Set-Cookie', [
    `waitKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`,
    `idKey=${encryptedUserId}; SameSite=Strict; Secure; Path=/; Max-Age=25920000; HttpOnly;`,
    `sessionKey=${encryptedSessionId}; SameSite=Strict; Secure; Path=/; Max-Age=25920000; HttpOnly;`,
  ]);
};

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<SessionResponse>) => {
      const { waitKey } = z
        .object({
          waitKey: z.string(),
        })
        .parse(req.cookies);

      const [userId, sessionId] = auth.decrypt(waitKey).split('-SEP-');
      const { db } = environment;

      const session = await db.session.get(sessionId);

      // set user cookies if logged in
      if (session.isLoggedIn) {
        addAuthHeaders(res, userId, sessionId);
      }

      res.status(200).json({
        isLoggedIn: session.isLoggedIn,
        links: {
          wait: `/api/sessions`,
        },
      });
    }
  )
  .withPost(async (req: NextApiRequest, res: NextApiResponse<OK>) => {
    const { sessionKey } = z
      .object({
        sessionKey: z.string(),
      })
      .parse(req.query);
    const sessionId = auth.decrypt(sessionKey);
    const { db } = environment;

    // set isLoggedIn in database to true
    await db.session.update(sessionId);

    res.status(200).json({
      ok: true,
    });
  })
  .engage();

export default handler;
