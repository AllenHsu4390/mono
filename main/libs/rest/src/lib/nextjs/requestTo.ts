import type { NextApiRequest } from 'next';
import { auth } from '@main/auth';
import { getUser } from '@main/rest';

export const requestTo = {
  user: async (req: NextApiRequest) => {
    const { idKey } = req.cookies;
    if (!idKey) {
      throw {
        message: 'Authentication failed',
      };
    }
    const userId = auth().identity.userId(idKey);
    const user = await getUser(userId);
    return user;
  },
};
