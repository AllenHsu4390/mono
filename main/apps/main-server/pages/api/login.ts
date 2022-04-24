import type { NextApiRequest, NextApiResponse } from 'next';
import { Error, Response, User } from '@main/models';
import { auth } from '@main/auth';
import { getUserIdByEmail } from '@main/rest';

type OK = {
  ok: true;
} & Response;

const setSession = (res: NextApiResponse, encryptedUserId: string) => {
  const cookieValue = `idKey=${encryptedUserId}; SameSite=Strict; Secure; Path=/; Max-Age=25920000; HttpOnly;`;
  res.setHeader('Set-Cookie', cookieValue);
};

const login = async (req, res: NextApiResponse<Error | OK>) => {
  const { email }: User = req.body;
  const userId = await getUserIdByEmail(email);
  setSession(res, auth().identity.encryptedUserId(userId));
  res.status(200).json({
    ok: true,
    links: [],
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Error | OK>
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
    res.status(401).json(e);
  }
}
