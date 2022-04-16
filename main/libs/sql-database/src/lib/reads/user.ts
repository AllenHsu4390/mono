import { connectToDatabase } from '../db';
import { User } from '../entity/user';

export const getUser = async (id) => {
  const db = await connectToDatabase();
  const userId = Number(id);
  const user = await db.getRepository(User).findOne({
    where: {
      id: userId,
    },
  });
  return {
    id: `${user.id}`,
    avatarUrl: user.avatarUrl,
    email: user.email,
    isLoggedIn: true,
  };
};
