import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { getUserIdByEmail } from '@main/rest';
import { ErrorResponse } from '@main/rest-models';
import { z } from 'zod';
import { withErrorResponse } from '@main/next-utils';

type OK = {
  magic: string;
};

const login = async (req, res: NextApiResponse<ErrorResponse | OK>) => {
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
};

const handler = withErrorResponse(
  async (req: NextApiRequest, res: NextApiResponse<ErrorResponse | OK>) => {
    switch (true) {
      case req.method === 'POST':
        await login(req, res);
        break;
      default:
        throw {
          message: 'Invalid operation',
        };
    }
  }
);

export default handler;
