import type { NextApiRequest, NextApiResponse } from 'next';
import { getError } from '@main/rest';
import { ErrorResponse } from '@main/rest-models';

type OK = {
  ok: true;
};

const setSession = (res: NextApiResponse) => {
  const cookieValue = `idKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`;

  res.setHeader('Set-Cookie', cookieValue);
};

const logout = async (res: NextApiResponse<ErrorResponse | OK>) => {
  setSession(res);
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
        await logout(res);
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
