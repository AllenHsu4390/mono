import type { NextApiRequest, NextApiResponse } from 'next';
import { Error, User } from '@main/models';
import { auth } from '@main/auth';
import { environment } from '@main/environment';
import { allLinks, State } from '@main/state-machine';

const userFromLogin = (req: NextApiRequest) => 'sdfasdfasdfasdf';

type OK = {
  ok: true;
} & State;

type UserRes = User & State;

const setSession = (res: NextApiResponse, user: User) => {
  const cookieValue = user.isLoggedIn
    ? 'idKey=asdfasdfsadfasdfasdfasdf; SameSite=Strict; Secure; Path=/; Max-Age=25920000; HttpOnly;'
    : 'idKey=deleted; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;';

  res.setHeader('Set-Cookie', cookieValue);
};

const guards: ((res: NextApiResponse, user: User) => void)[] = [setSession];

const runGuards = (res: NextApiResponse, user: User) => {
  guards.forEach((g) => g(res, user));
};

const postSchema = (body: any): User => {
  return {
    email: body.email || '',
    id: 'aasdfsadfasdf',
    avatarUrl: 'https://source.unsplash.com/random/300x300',
    isLoggedIn: true,
  };
};

const putSchema = (body: any): User => {
  return {
    isLoggedIn: body.isLoggedIn || false,
    avatarUrl: body.avatarUrl || false,
    id: 'static',
    email: 'static',
  };
};

const me = {
  update: async (req, res: NextApiResponse<UserRes | Error | OK>) => {
    const db = environment().db;
    const { isLoggedIn, avatarUrl }: User = putSchema(req.body);
    const userId = auth().identity.userId(userFromLogin(req));
    const user = await db.get.user(userId);
    const newUser = {
      ...user,
      isLoggedIn,
      avatarUrl,
    };
    await db.save.user(newUser);
    runGuards(res, newUser);
    res.status(200).json({
      ok: true,
      ...allLinks.get('POST:/api/users/me'),
    });
  },
  create: async (req, res: NextApiResponse<UserRes | Error | OK>) => {
    const db = environment().db;
    const user: User = postSchema(req.body);
    await db.save.user(user);
    runGuards(res, user);
    res.status(200).json({
      ok: true,
      ...allLinks.get('POST:/api/users'),
    });
  },
  read: async (req, res: NextApiResponse<UserRes | Error | OK>) => {
    const { idKey } = req.cookies;
    if (!idKey) {
      throw {
        message: 'Authentication failed',
      };
    }
    const db = environment().db;
    const userId = auth().identity.userId(idKey);
    const user = await db.get.user(userId);
    runGuards(res, user);
    res.status(200).json({
      ...user,
      ...allLinks.get('GET:/api/users/me'),
    });
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<(User & State) | Error | OK>
) {
  const { id } = req.query;
  try {
    switch (true) {
      case req.method === 'POST' && id === 'me':
        await me.update(req, res);
        break;
      case req.method === 'POST':
        await me.create(req, res);
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
