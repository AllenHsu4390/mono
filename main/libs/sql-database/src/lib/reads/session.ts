import { connectToDatabase } from '../db';
import { decode, encode } from '@main/hash';
import { Session } from '../entity/session';

export const getSession = async (id: string) => {
  const db = await connectToDatabase();
  const userId = decode(id);
  const session = await db.getRepository(Session).findOneOrFail({
    where: {
      id: userId,
    },
  });

  return {
    id: encode(session.id),
  };
};
