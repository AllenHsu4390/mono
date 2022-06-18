import { connectToDatabase } from '../db';
import { decode, encode } from '@main/hash';
import { Session } from '../entity/session';

const VALID_TIME = 60000; // one minute

export const isValidSession = (updatedAt: Date) => {
  const nowTime = new Date();
  const maxValidTime = updatedAt.getTime() + VALID_TIME;
  return nowTime.getTime() < maxValidTime;
};

export const getSession = async (userId: string) => {
  const db = await connectToDatabase();
  const session = await db.getRepository(Session).findOneOrFail({
    where: {
      id: decode(userId),
    },
  });

  return {
    id: encode(session.id),
    isLoggedIn: isValidSession(session.updatedAt),
  };
};
