import type { NextApiRequest, NextApiResponse } from 'next';
import { getError, saveLike } from '@main/rest';
import { auth } from '@main/auth';
import { DropResponse, ErrorResponse } from '@main/rest-models';

const userFromLogin = (req: NextApiRequest) => req.cookies.idKey;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DropResponse | ErrorResponse>
) {
  try {
    const { id } = req.query;
    const userId = auth().identity.userId(userFromLogin(req));

    if (typeof id !== 'string') {
      throw {
        message: 'Something went wrong',
      };
    }

    if (req.method !== 'POST') {
      throw {
        message: 'Invalid method',
      };
    }

    const drop = await saveLike({
      userId,
      assetId: id,
    });

    res.status(200).json(drop);
  } catch (e) {
    const error = getError(e);
    res.status(error.status).json(error);
  }
}
