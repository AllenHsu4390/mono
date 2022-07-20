import { auth } from '@main/auth';
import { environment } from '@main/environment';
import {
  AssetsResponse,
  CategoriesResponse,
  GuestResponse,
  User,
  UserResponse,
} from '@main/rest-models';
import * as _ from 'lodash';
import {
  GetServerSideProps,
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { z } from 'zod';

export const getError = (e: any): ErrorResponse => {
  const status = e.status || 400;

  if (process.env.NODE_ENV === 'development') {
    console.log(e);
  }

  return {
    e,
    status, // derive from e later
    links: {
      home: '/',
    },
  };
};

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
        guest: getGuestResponse(),
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
      if (process.env.NODE_ENV === 'development') {
        console.log(error);
      }
      res.status(error.status).json({
        message: 'something went wrong',
        status: error.status,
      });
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

export const getUserResponse = async (userId: string) => {
  if (!userId) {
    throw new Error('Invalid Auth');
  }

  const { cache, db } = environment;

  const user = await cache.user.get(
    userId,
    async () => await db.user.get(userId)
  );

  return {
    ...user,
    links: {
      editAccount: '/users/edit',
      balance: '/api/transactions/balance',
      gallery: `/galleries/${user.creatorId}`,
      creator: `/api/creators/${user.creatorId}`,
      logoutPage: '/users/logout',
      me: '/api/users/me',
      ...(user.hasDailyTopUp
        ? {
            dailyTopUp: '/api/transactions/mint',
          }
        : {}),
    },
  };
};

export const getCreatorResponse = async (
  creatorId: string,
  user: User | null
) => {
  const { db } = environment;
  const creator = await db.creator.get(creatorId);

  return {
    ...creator,
    links: {
      assets: `/api/assets?creatorId=${creatorId}&pageId=1`,
      gallery: `/galleries/${creatorId}`,
      ...(user && user.creatorId === creatorId
        ? {
            newAsset: `/api/assets`,
          }
        : {}),
    },
  };
};

export const getGuestResponse = (): GuestResponse => {
  return {
    links: {
      loginPage: '/users/login',
      login: '/api/users/login',
      logout: '/api/users/logout',
      signup: '/api/users',
      categories: '/api/categories',
    },
  };
};

export const getCategoriesResponse = (): CategoriesResponse => {
  return {
    categories: [
      'misc',
      'pets',
      'cats',
      'dogs',
      'nightlife',
      'nature',
      'games',
      'basketball',
      'soccer',
      'sports',
      'cooking',
      'cafe',
      'dessert',
      'restaurant',
      'relax',
    ],
  };
};

export const getAssetsResponse = async (creatorId: string, pageId: string) => {
  const { db } = environment;
  const { assets, pagination } = await db.assets.get(creatorId, pageId);

  return {
    assets,
    pagination,
    links: {
      assets: assets.map((a) => `/assets/${a.id}`),
      ...(pagination.next
        ? {
            next: `/api/assets?creatorId=${creatorId}&pageId=${pagination.next}`,
          }
        : {}),
    },
  };
};

export const getTopAssetsResponse = async (
  pageId: string
): Promise<AssetsResponse> => {
  const db = environment.db;
  const { assets, pagination } = await db.topAssets.get(pageId);

  return {
    assets,
    pagination,
    links: {
      assets: assets.map((a) => `/assets/${a.id}`),
      ...(pagination.next
        ? {
            next: `/api/assets/top?pageId=${pagination.next}`,
          }
        : {}),
    },
  };
};

export const getAssetResponse = async (id: string, user: User | null) => {
  const { db } = environment;
  const asset = await db.asset.get(id);
  const isLogin = !!user;
  const isOwnAsset = isLogin && asset.creator.id === user.creatorId;

  return {
    ...asset,
    links: {
      likeCount: `/api/assets/${asset.id}/likes/count`,
      ...(isOwnAsset
        ? {
            delete: `/api/assets/${asset.id}/delete`,
          }
        : {
            like: `/api/assets/${asset.id}/likes`,
          }),
      creator: `/galleries/${asset.creator.id}`,
    },
  };
};

export const requestTo = {
  sessionId: async (req: { cookies: NextApiRequestCookies }) => {
    const { sessionKey } = z
      .object({
        sessionKey: z.string(),
      })
      .parse(req.cookies);

    return z.string().min(1).parse(auth.decrypt(sessionKey));
  },
  user: async (req: {
    cookies: NextApiRequestCookies;
  }): Promise<UserResponse> => {
    const { idKey } = z
      .object({
        idKey: z.string(),
      })
      .parse(req.cookies);

    const userId = auth.decrypt(idKey);

    return getUserResponse(userId);
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

    return getUserResponse(userId);
  },
};
