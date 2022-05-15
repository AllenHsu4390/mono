import { connectToDatabase } from '../db';
import { User } from '../entity/user';
import { decode, encode } from '../hash';

export const getUser = async (id: string) => {
  const db = await connectToDatabase();
  const userId = decode(id);
  const user = await db.getRepository(User).findOneOrFail({
    where: {
      id: userId,
    },
    relations: ['creator', 'dailyTopUp'],
  });
  return {
    id: encode(user.id),
    avatarUrl: user.creator.avatarUrl,
    email: user.email,
    isLoggedIn: true,
    name: user.creator.name,
    dailyTopUpId: encode(user.dailyTopUp.id),
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
