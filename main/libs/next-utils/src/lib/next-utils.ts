import { getError } from '@main/rest';
import {
  GetServerSideProps,
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from 'next';

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

export const withErrorResponse = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res);
    } catch (e) {
      const error = getError(e);
      res.status(error.status).json(error);
    }
  };
};
