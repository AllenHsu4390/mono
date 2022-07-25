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
