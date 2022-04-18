import { connectToDatabase } from '../db';
import { User } from '../entity/user';
import { decode, encode } from '../hash';

export const getUser = async (id) => {
  const db = await connectToDatabase();
  const userId = decode(id);
  const user = await db.getRepository(User).findOne({
    where: {
      id: userId,
    },
  });
  return {
    id: encode(user.id),
    avatarUrl: user.avatarUrl,
    email: user.email,
    isLoggedIn: true,
  };
};
