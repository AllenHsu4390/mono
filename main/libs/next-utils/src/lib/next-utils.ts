import { auth } from '@main/auth';
import { getError, getUser } from '@main/rest';
import {
  GetServerSideProps,
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { z } from 'zod';

export const withRedirect404OnError = (
  getSsp: GetServerSideProps
): GetServerSideProps => {
  return async (ctx) => {
    try {
      return await getSsp(ctx);
    } catch (e) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      };
    }
  };
};

const withErrorResponse = (handler: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res);
    } catch (e) {
      const error = getError(e);
      res.status(error.status).json(error);
    }
  };
};

interface Methods {
  post?: NextApiHandler;
  get?: NextApiHandler;
}

export const withMethods = (methods: Methods): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST' && methods.post) {
      return await methods.post(req, res);
    }
    if (req.method === 'GET' && methods.get) {
      return await methods.get(req, res);
    }
    throw {
      status: 405,
      message: 'Invalid method',
    };
  };
};

export class ApiHandler {
  private methods: Methods = {};
  private traits: Array<(handler: NextApiHandler) => NextApiHandler> = [];

  public withErrorResponse() {
    this.traits.push(withErrorResponse);
    return this;
  }

  public withPost(handler: NextApiHandler) {
    this.methods.post = handler;
    return this;
  }

  public withGet(handler: NextApiHandler) {
    this.methods.get = handler;
    return this;
  }

  public engage(): NextApiHandler {
    let handler = withMethods(this.methods);

    this.traits.forEach((trait) => {
      handler = trait(handler);
    });

    return handler;
  }
}

export interface OK {
  ok: true;
}

export const requestTo = {
  user: async (req: { cookies: NextApiRequestCookies }) => {
    const { idKey } = z
      .object({
        idKey: z.string(),
      })
      .parse(req.cookies);

    const userId = auth().identity.userId(idKey);
    return await getUser(userId);
  },
  userId: async (req: { cookies: NextApiRequestCookies }) => {
    const { idKey } = z
      .object({
        idKey: z.string(),
      })
      .parse(req.cookies);

    const userId = z.string().min(1).parse(auth().identity.userId(idKey));

    return userId;
  },
  userOrNull: async (req: { cookies: NextApiRequestCookies }) => {
    const { idKey } = z
      .object({
        idKey: z.string().optional(),
      })
      .parse(req.cookies);

    if (!idKey) {
      return null;
    }

    const userId = auth().identity.userId(idKey);

    if (!userId) {
      return null;
    }

    return await getUser(userId);
  },
};
