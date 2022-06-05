import type { NextApiRequest, NextApiResponse } from 'next';
import { getError, getSession } from '@main/rest';
import { ErrorResponse, SessionResponse } from '@main/rest-models';
import { setSession } from '../logout';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SessionResponse | ErrorResponse>
) {
  try {
    res.status(200).json(await getSession());
  } catch (e) {
    const error = getError(e);
    setSession(res);
    res.status(error.status).json(error);
  }
}
