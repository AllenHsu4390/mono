import type { NextApiRequest, NextApiResponse } from 'next';
import { saveUser } from '@main/rest';
import { z } from 'zod';
import { ApiHandler } from '@main/next-utils';
import { LoginResponse } from '@main/rest-models';
import { initiateLogin } from './login';

const handler = new ApiHandler()
  .withErrorResponse()
  .withPost(
    async (req: NextApiRequest, res: NextApiResponse<LoginResponse>) => {
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
