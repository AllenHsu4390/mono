import type { NextApiRequest, NextApiResponse } from 'next';
import { rest } from '@main/rest';
import { CategoriesResponse } from '@main/rest-models';
import { ApiHandler, withErrorResponse } from '@main/next-utils';

const handler = new ApiHandler()
  .add(withErrorResponse)
  .withGet(
    async (req: NextApiRequest, res: NextApiResponse<CategoriesResponse>) => {
      res.status(200).json(await rest.categories.get());
    }
  )
  .engage();

export default handler;
