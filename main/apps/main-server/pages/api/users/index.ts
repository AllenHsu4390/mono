import type { NextApiRequest, NextApiResponse } from 'next';
import { Users } from '@main/models';
import { Error } from '@main/models';
import { environment } from '@main/environment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Users | Error>
) {
  const db = environment().db;
  res.status(200).json(await new db.Users('0').get());
}
