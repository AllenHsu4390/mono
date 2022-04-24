import type { NextApiRequest, NextApiResponse } from 'next';
import { Error, Response } from '@main/models';

type OK = {
  ok: true;
} & Response;

const setSession = (res: NextApiResponse) => {
  const cookieValue = `idKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`;

  res.setHeader('Set-Cookie', cookieValue);
};

const logout = async (res: NextApiResponse<Error | OK>) => {
  setSession(res);
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
        await logout(res);
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
