import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse } from '@main/rest-models';
import { withErrorResponse } from '@main/next-utils';

type OK = {
  ok: true;
};

export const setSession = (res: NextApiResponse) => {
  const cookieValue = `idKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`;

  res.setHeader('Set-Cookie', cookieValue);
};

const logout = async (res: NextApiResponse<ErrorResponse | OK>) => {
  setSession(res);
  res.status(200).json({
    ok: true,
  });
};

const handler = withErrorResponse(
  async (req: NextApiRequest, res: NextApiResponse<ErrorResponse | OK>) => {
    switch (true) {
      case req.method === 'POST':
        await logout(res);
        break;
      default:
        throw {
          message: 'Invalid operation',
        };
    }
  }
);

export default handler;
