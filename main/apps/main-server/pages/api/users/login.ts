import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { rest } from '@main/rest';
import { z } from 'zod';
import { ApiHandler, withErrorResponse } from '@main/next-utils';
import { SessionResponse } from '@main/rest-models';

export const initiateLogin = async (
  userId: string,
  res: NextApiResponse<SessionResponse>
) => {
  const session = await rest.sessions.post({
    userId,
  });

  const sessionKey = auth.encrypt(session.id);
  const waitKey = auth.encrypt([userId, session.id].join('-SEP-'));

  // send to email
  console.log(`localhost:4200/users/auth?sessionKey=${sessionKey}`);

  res.setHeader('Set-Cookie', [
    `idKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`,
    `sessionKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`,
    `waitKey=${waitKey}; SameSite=Strict; Secure; Path=/; Max-Age=25920000; HttpOnly;`,
  ]);

  res.status(200).json(await rest.sessions.param(session.id).get());
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
      const userId = await rest.users.id.get({ email });
      await initiateLogin(userId, res);
    }
  )
  .engage();

export default handler;
