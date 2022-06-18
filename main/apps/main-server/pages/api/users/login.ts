import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { getUserIdByEmail } from '@main/rest';
import { z } from 'zod';
import { ApiHandler } from '@main/next-utils';
import { LoginResponse } from '@main/rest-models';

export const initiateLogin = async (
  userId: string,
  res: NextApiResponse<LoginResponse>
) => {
  const [u, iv] = auth().identity.encryptedUserId(userId).split('|');
  res.status(200).json({
    links: {
      auth: {
        rel: 'auth',
        url: `/api/sessions?u=${u}&iv=${iv}`,
      },
      magic: {
        rel: 'magic',
        url: `https://localhost:4200/users/auth?u=${u}&iv=${iv}`,
      },
    },
  });
};

const handler = new ApiHandler()
  .withErrorResponse()
  .withPost(
    async (req: NextApiRequest, res: NextApiResponse<LoginResponse>) => {
      const { email } = z
        .object({
          email: z.string().email('Not a valid email'),
        })
        .parse(req.body);
      const userId = await getUserIdByEmail(email);
      initiateLogin(userId, res);
    }
  )
  .engage();

export default handler;
