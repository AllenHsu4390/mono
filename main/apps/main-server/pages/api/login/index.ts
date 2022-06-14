import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { getUserIdByEmail } from '@main/rest';
import { z } from 'zod';
import { ApiHandler } from '@main/next-utils';

type MagicLinkResponse = {
  magic: string;
};

const handler = new ApiHandler()
  .withErrorResponse()
  .withPost(
    async (req: NextApiRequest, res: NextApiResponse<MagicLinkResponse>) => {
      const { email } = z
        .object({
          email: z.string().email(),
        })
        .parse(req.body);
      const userId = await getUserIdByEmail(email);
      const tokenPieces = auth().identity.encryptedUserId(userId).split('|');
      res.status(200).json({
        magic: `localhost:4200/api/authentications?u=${tokenPieces[0]}&iv=${tokenPieces[1]}`,
      });
    }
  )
  .engage();

export default handler;
