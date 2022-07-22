import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { ApiHandler, withErrorResponse } from '@main/next-utils';
import { initiateLogin } from './login';
import { managedErrorMessages, SessionResponse } from '@main/rest-models';
import { environment } from '@main/environment';

// sign up
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

      const { id: userId } = await db.user.save(email, 5000);

      await initiateLogin(userId, res);
    }
  )
  .engage();

export default handler;
