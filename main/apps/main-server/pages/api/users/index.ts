import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { ApiHandler, withErrorResponse } from '@main/next-utils';
import { initiateLogin } from './login';
import { SessionResponse } from '@main/rest-models';
import { environment } from '@main/environment';

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

      await initiateLogin(userId, res);
    }
  )
  .engage();

export default handler;
