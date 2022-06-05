import { connectToDatabase } from '../db';
import { User } from '../entity/user';
import { decode, encode } from '@main/hash';
import { isTopUpTime } from '../writes/daily-top-up';

export const getUser = async (id: string) => {
  const db = await connectToDatabase();
  const userId = decode(id);
  const user = await db.getRepository(User).findOneOrFail({
    where: {
      id: userId,
    },
    relations: ['creator', 'dailyTopUp'],
  });
  const dailyTopUp = user.dailyTopUp;

  return {
    id: encode(user.id),
    avatarUrl: user.creator.avatarUrl,
    email: user.email,
    isLoggedIn: true,
    name: user.creator.name,
    hasDailyTopUp: isTopUpTime(dailyTopUp.updatedAt),
  };
};

export const getUserId = async (email: string) => {
  const db = await connectToDatabase();
  const user = await db.getRepository(User).findOneOrFail({
    select: {
      id: true,
    },
    where: {
      email,
    },
  });
  return encode(user.id);
};
