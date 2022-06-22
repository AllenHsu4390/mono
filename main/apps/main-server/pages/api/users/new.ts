import type { NextApiRequest, NextApiResponse } from 'next';
import { rest } from '@main/rest';
import { z } from 'zod';
import { ApiHandler, withErrorResponse } from '@main/next-utils';
import { initiateLogin } from './login';
import { SessionResponse } from '@main/rest-models';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withPost(
    async (req: NextApiRequest, res: NextApiResponse<SessionResponse>) => {
      const { email } = z
        .object({
          email: z.string().email('Not a valid email'),
        })
        .parse(req.body);
      const userId = await rest.users.new({
        email,
      });
      await initiateLogin(userId, res);
    }
  )
  .engage();

export default handler;
