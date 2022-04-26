import type { NextApiRequest, NextApiResponse } from 'next';
import { Drop, Response } from '@main/models';
import { saveLike } from '@main/rest';
import { auth } from '@main/auth';

const dropRate = ({ pctChance } = { pctChance: 0.02 }) => {
  return Math.random() < pctChance;
};
const userFromLogin = (req: NextApiRequest) => req.cookies.idKey;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Drop & Response>
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

    const like = await saveLike({
      userId,
      assetId: id,
    });

    const isDropped = dropRate();

    res.status(200).json({
      isDropped,
      assetId: id,
      ...like,
    });
  } catch (e) {
    res.status(403).json(e);
  }
}
