import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { ApiHandler, withErrorResponse } from '@main/next-utils';
import { SessionResponse } from '@main/rest-models';
import { environment } from '@main/environment';
import { auth } from '@main/auth';

export const addSessionHeader = async (
  userId: string,
  res: NextApiResponse
) => {
  const { db } = environment;
  const { id: sessionId } = await db.session.create(userId);

  const sendToEmail = () => {
    const sessionKey = auth.encrypt(sessionId);
    // send auth to email

    if (process.env.NODE_ENV === 'development') {
      console.log(`localhost:4200/users/auth?sessionKey=${sessionKey}`);
    }
  };

  sendToEmail();

  // start session in cookie
  const waitKey = auth.encrypt([userId, sessionId].join('-SEP-'));
  res.setHeader('Set-Cookie', [
    `idKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`,
    `sessionKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`,
    `waitKey=${waitKey}; SameSite=Strict; Secure; Path=/; Max-Age=25920000; HttpOnly;`,
  ]);
};

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withPost(
    async (req: NextApiRequest, res: NextApiResponse<SessionResponse>) => {
      const { email } = z
        .object({
          email: z.string().email('Not a valid email'),
        })
        .parse(req.body);
      const db = environment.db;

      const userId = await db.userId.get(email);

      // new user, send to signup
      if (!userId) {
        res.status(200).json({
          isLoggedIn: false,
          links: {
            signup: '/api/users',
          },
        });
        return;
      }

      // existing user, send to session wait
      await addSessionHeader(userId, res);

      res.status(200).json({
        isLoggedIn: false,
        links: {
          wait: `/api/sessions`,
        },
      });
    }
  )
  .engage();

export default handler;
