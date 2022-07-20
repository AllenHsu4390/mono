import type { NextApiRequest, NextApiResponse } from 'next';
import { CategoriesResponse } from '@main/rest-models';
import {
  ApiHandler,
  getCategoriesResponse,
  withErrorResponse,
} from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<CategoriesResponse>) => {
      res.status(200).json(getCategoriesResponse());
    }
  )
  .engage();

export default handler;
