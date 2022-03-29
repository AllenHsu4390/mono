import type { NextApiRequest, NextApiResponse } from 'next';
import { Assets } from '@main/models';
import { environment } from '@main/environment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Assets>
) {
  const db = environment().db;
  const { pageId } = req.query;

  if (Array.isArray(pageId)) {
    res.status(401);
    return;
  }

  res.status(200).json(await db.get.assets(pageId));
  return;
}
