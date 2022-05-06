import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { getError, getUserIdByEmail } from '@main/rest';
import { ErrorResponse } from '@main/rest-models';

type OK = {
  ok: true;
};

const setSession = (res: NextApiResponse, encryptedUserId: string) => {
  const cookieValue = `idKey=${encryptedUserId}; SameSite=Strict; Secure; Path=/; Max-Age=25920000; HttpOnly;`;
  res.setHeader('Set-Cookie', cookieValue);
};

const login = async (req, res: NextApiResponse<ErrorResponse | OK>) => {
  const { email }: { email: string } = req.body;
  const userId = await getUserIdByEmail(email);
  setSession(res, auth().identity.encryptedUserId(userId));
  res.status(200).json({
    ok: true,
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
