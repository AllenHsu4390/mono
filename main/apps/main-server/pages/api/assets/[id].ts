import type { NextApiRequest, NextApiResponse } from 'next';
import { Asset } from '@main/models';
import { environment } from '@main/environment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Asset>
) {
  const db = environment().db;
  const { id } = req.query;

  if (Array.isArray(id)) {
    res.status(401);
    return;
  }

  res.status(200).json(await db.get.asset(id));
  return;
}
