import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { getError, getUserIdByEmail } from '@main/rest';
import { ErrorResponse } from '@main/rest-models';

type OK = {
  magic: string;
};

const login = async (req, res: NextApiResponse<ErrorResponse | OK>) => {
  const { email }: { email: string } = req.body;
  const userId = await getUserIdByEmail(email);
  res.status(200).json({
    magic: `localhost:4200/api/login/${auth().identity.encryptedUserId(
      userId,
      '/'
    )}`,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | OK>
) {
  try {
    switch (true) {
      case req.method === 'POST':
        await login(req, res);
        break;
      default:
        throw {
          message: 'Invalid operation',
        };
    }
  } catch (e) {
    const error = getError(e);
    res.status(error.status).json(error);
  }
}
