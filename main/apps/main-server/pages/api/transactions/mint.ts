import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@main/auth';
import { getError, saveMint } from '@main/rest';
import { ErrorResponse } from '@main/rest-models';

interface OK {
  ok: boolean;
}

const post = async (req, res: NextApiResponse<OK | ErrorResponse>) => {
  const { idKey } = req.cookies;
  if (!idKey) {
    throw {
      message: 'Authentication failed',
    };
  }
  const userId = auth().identity.userId(idKey);
  await saveMint(userId);
  res.status(200).json({
    ok: true,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OK | ErrorResponse>
) {
  try {
    switch (true) {
      case req.method === 'POST':
        await post(req, res);
        break;
      default:
        throw {
          message: 'Invalid operation',
        };
    }
  } catch (e) {
    const error = getError(e);
    res.status(error.status).json(error);
  }
}
