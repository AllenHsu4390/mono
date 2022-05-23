import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { getError, getUser, getUserIdByEmail } from '@main/rest';
import { ErrorResponse } from '@main/rest-models';

const setSession = (res: NextApiResponse, encryptedUserId: string) => {
  const cookieValue = `idKey=${encryptedUserId}; SameSite=Strict; Secure; Path=/; Max-Age=25920000; HttpOnly;`;
  res.setHeader('Set-Cookie', cookieValue);
};

const login = async (req, res: NextApiResponse<ErrorResponse>) => {
  const { id, iv }: { id: string; iv: string } = req.query;
  const user = await getUser(auth().identity.userId([id, iv].join('|')));
  setSession(res, auth().identity.encryptedUserId(user.id));
  return res.redirect('/');
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse>
) {
  try {
    await login(req, res);
  } catch (e) {
    const error = getError(e);
    res.status(error.status).json(error);
  }
}
