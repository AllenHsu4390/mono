import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { z } from 'zod';
import { ApiHandler, withErrorResponse } from '@main/next-utils';
import { SessionResponse } from '@main/rest-models';
import { environment } from '@main/environment';

export const initiateLogin = async (
  userId: string,
  res: NextApiResponse<SessionResponse>
) => {
  const db = environment.db;
  const { id: sessionId } = await db.session.create(userId);

  const sessionKey = auth.encrypt(sessionId);
  const waitKey = auth.encrypt([userId, sessionId].join('-SEP-'));

  // send to email
  console.log(`localhost:4200/users/auth?sessionKey=${sessionKey}`);

  res.setHeader('Set-Cookie', [
    `idKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`,
    `sessionKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`,
    `waitKey=${waitKey}; SameSite=Strict; Secure; Path=/; Max-Age=25920000; HttpOnly;`,
  ]);

  res.status(200).json({
    isLoggedIn: false,
    links: {
      session: `/api/sessions`,
    },
  });
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
      if (!userId) {
        res.status(200).json({
          isLoggedIn: false,
          links: {
            signup: '/api/users',
          },
        });
        return;
      }
      await initiateLogin(userId, res);
    }
  )
  .engage();

export default handler;
