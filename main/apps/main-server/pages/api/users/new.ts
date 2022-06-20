import type { NextApiRequest, NextApiResponse } from 'next';
import { saveUser } from '@main/rest';
import { z } from 'zod';
import { ApiHandler } from '@main/next-utils';
import { initiateLogin } from './login';
import { SessionResponse } from '@main/rest-models';

const handler = new ApiHandler()
  .withErrorResponse()
  .withPost(
    async (req: NextApiRequest, res: NextApiResponse<SessionResponse>) => {
      const { email } = z
        .object({
          email: z.string().email('Not a valid email'),
        })
        .parse(req.body);
      const userId = await saveUser(email);
      initiateLogin(userId, res);
    }
  )
  .engage();

export default handler;
