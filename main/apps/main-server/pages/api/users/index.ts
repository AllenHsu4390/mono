import type { NextApiRequest, NextApiResponse } from 'next';
import { Users } from '@main/models';
import { Error } from '@main/models';
import { auth } from '@main/auth';
import { environment } from '@main/environment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Users | Error>
) {
  const db = environment().db;
  const userId = auth().identity.userId('asdfasdfasdfasdf');
  res.status(200).json(await db.get.users(userId));
}
