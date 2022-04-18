import type { NextApiRequest, NextApiResponse } from 'next';
import { Error, Response, User } from '@main/models';
import { auth } from '@main/auth';
import { getUser } from '@main/rest';

const userFromLogin = (req: NextApiRequest) => req.cookies.idKey;

type OK = {
  ok: true;
} & Response;

type UserRes = User & Response;

const setSession = (res: NextApiResponse, user: User) => {
  const cookieValue = user.isLoggedIn
    ? `idKey=${user.id}; SameSite=Strict; Secure; Path=/; Max-Age=25920000; HttpOnly;`
    : `idKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;`;

  res.setHeader('Set-Cookie', cookieValue);
};

const putSchema = (body: any): User => {
  return {
    isLoggedIn: body.isLoggedIn || false,
    avatarUrl: 'static',
    id: 'static',
    email: 'static',
  };
};

const me = {
  update: async (req, res: NextApiResponse<UserRes | Error | OK>) => {
    const { isLoggedIn, avatarUrl }: User = putSchema(req.body);
    const userId = auth().identity.userId(userFromLogin(req));
    const user = await getUser(userId);
    const newUser = {
      ...user,
      isLoggedIn,
      avatarUrl,
    };
    setSession(res, newUser);
    res.status(200).json({
      ok: true,
      links: [],
    });
  },
  read: async (req, res: NextApiResponse<UserRes | Error | OK>) => {
    const { idKey } = req.cookies;
    if (!idKey) {
      throw {
        message: 'Authentication failed',
      };
    }
    const userId = auth().identity.userId(idKey);
    const user = await getUser(userId);
    setSession(res, user);
    res.status(200).json(user);
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<(User & Response) | Error | OK>
) {
  const { id } = req.query;
  try {
    switch (true) {
      case req.method === 'POST' && id === 'me':
        await me.update(req, res);
        break;
      case req.method === 'GET' && id === 'me':
        await me.read(req, res);
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
