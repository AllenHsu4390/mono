import { auth } from '@main/auth';
import { getError, rest } from '@main/rest';
import * as _ from 'lodash';
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
      if (process.env.NODE_ENV === 'development') {
        console.log(e);
      }
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      };
    }
  };
};

export const withUserProps = (
  getSsp: GetServerSideProps
): GetServerSideProps => {
  return async (ctx) => {
    return _.merge(await getSsp(ctx), {
      props: {
        user: await requestTo.user(ctx.req),
      },
    });
  };
};

export const withUserOrNullProps = (
  getSsp: GetServerSideProps
): GetServerSideProps => {
  return async (ctx) => {
    return _.merge(await getSsp(ctx), {
      props: {
        user: await requestTo.userOrNull(ctx.req),
      },
    });
  };
};

export const withGuestProps = (
  getSsp: GetServerSideProps
): GetServerSideProps => {
  return async (ctx) => {
    return _.merge(await getSsp(ctx), {
      props: {
        guest: await rest.guests.start.get(),
      },
    });
  };
};

export const withErrorResponse = (handler: NextApiHandler): NextApiHandler => {
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

export class PropsHandler {
  private traits: Array<(getSsp: GetServerSideProps) => GetServerSideProps> =
    [];

  public add(trait: (getSsp: GetServerSideProps) => GetServerSideProps) {
    this.traits.push(trait);
    return this;
  }
  public engage(handler: GetServerSideProps) {
    return this.traits.reduce((accum, trait) => {
      return trait(accum);
    }, handler);
  }
}

export class ApiHandler {
  private methods: Methods = {};
  private traits: Array<(handler: NextApiHandler) => NextApiHandler> = [];

  public add(trait: (handler: NextApiHandler) => NextApiHandler) {
    this.traits.push(trait);
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
    return this.traits.reduce((accum, trait) => {
      return trait(accum);
    }, withMethods(this.methods));
  }
}

export interface OK {
  ok: true;
}

export const requestTo = {
  sessionId: async (req: { cookies: NextApiRequestCookies }) => {
    const { sessionKey } = z
      .object({
        sessionKey: z.string(),
      })
      .parse(req.cookies);

    return z.string().min(1).parse(auth.decrypt(sessionKey));
  },
  user: async (req: { cookies: NextApiRequestCookies }) => {
    const { idKey } = z
      .object({
        idKey: z.string(),
      })
      .parse(req.cookies);

    const userId = auth.decrypt(idKey);
    return await rest.users.param(userId).get();
  },
  userId: async (req: { cookies: NextApiRequestCookies }) => {
    const { idKey } = z
      .object({
        idKey: z.string(),
      })
      .parse(req.cookies);

    return z.string().min(1).parse(auth.decrypt(idKey));
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

    const userId = auth.decrypt(idKey);

    if (!userId) {
      return null;
    }

    return await rest.users.param(userId).get();
  },
};
