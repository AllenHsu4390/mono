import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { ApiHandler, sessionStart, withErrorResponse } from '@main/next-utils';
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

      // create user
      const { id: userId } = await db.user.save(email, 5000);

      // send to session wait
      await sessionStart(userId, res);

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
