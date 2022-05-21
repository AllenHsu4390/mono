import { connectToDatabase } from '../db';
import { User } from '../entity/user';
import { decode, encode } from '@main/hash';
import { isTopUpTime } from '../writes/dailyTopUp';

export const getUser = async (id: string) => {
  const db = await connectToDatabase();
  const userId = decode(id);

  console.log(`how is this a number: ${userId}`);

  const user = await db.getRepository(User).findOneOrFail({
    where: {
      id: userId,
    },
    relations: ['creator', 'dailyTopUp'],
  });

  console.log(user);
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
