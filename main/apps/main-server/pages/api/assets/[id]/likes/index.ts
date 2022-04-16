import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@main/models';
import { saveLike } from '@main/rest';
import { auth } from '@main/auth';

interface OK {
  ok: true;
}

const userFromLogin = (req: NextApiRequest) => 'sdfasdfasdfasdf';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OK & Response>
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

    res.status(200).json({
      ok: true,
      ...(await saveLike({
        userId,
        assetId: id,
      })),
    });
  } catch (e) {
    res.status(403).json(e);
  }
}
