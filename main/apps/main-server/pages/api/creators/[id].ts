import type { NextApiRequest, NextApiResponse } from 'next';
import { getCreator, getError } from '@main/rest';
import { CreatorResponse, ErrorResponse } from '@main/rest-models';

const typeError = (value, type) => {
  return {
    message: `Invalid type: ${value} to be ${type}`,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreatorResponse | ErrorResponse>
) {
  const { id } = req.query;
  try {
    if (typeof id !== 'string') {
      throw typeError(id, 'string');
    }

    res.status(200).json(await getCreator(id));
  } catch (e) {
    const error = getError(e);
    res.status(error.status).json(error);
  }
}
