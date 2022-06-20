import { connectToDatabase } from '../db';
import { decode, encode } from '@main/hash';
import { Session } from '../entity/session';
import { isTopUpTime } from '../writes/daily-top-up';

const VALID_TIME = 60000; // one minute

const isValidSession = (createdAt: Date) => {
  const nowTime = new Date();
  const maxValidTime = createdAt.getTime() + VALID_TIME;
  return nowTime.getTime() < maxValidTime;
};

export const getSession = async (sessionId: string) => {
  const db = await connectToDatabase();
  const session = await db.getRepository(Session).findOneOrFail({
    where: {
      id: decode(sessionId),
    },
    relations: ['user', 'user.creator', 'user.dailyTopUp'],
  });

  const user = session.user;
  const creator = user.creator;
  const dailyTopUp = user.dailyTopUp;

  return {
    id: encode(session.id),
    isLoggedIn: session.isLoggedIn && isValidSession(session.createdAt),
    user: {
      id: encode(user.id),
      avatarUrl: creator.avatarUrl,
      email: user.email,
      isLoggedIn: true,
      name: user.creator.name,
      hasDailyTopUp: isTopUpTime(dailyTopUp.updatedAt),
      creatorId: encode(creator.id),
    },
  };
};
