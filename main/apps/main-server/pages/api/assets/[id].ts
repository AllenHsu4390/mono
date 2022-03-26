import type { NextApiRequest, NextApiResponse } from 'next';
import { Asset } from '@main/models/Asset';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Asset>
) {
  const { id } = req.query;
  res.status(200).json({
    id: `${id}`,
    src: `https://source.unsplash.com/collection/${id}`,
  });
  return res;
}
