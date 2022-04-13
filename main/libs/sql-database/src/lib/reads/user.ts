import { connectToDatabase } from '../db';
import { User } from '../entity/user';

export const getUser = async (id) => {
  const db = await connectToDatabase();
  const userId = Number(id);
  const user = await db
    .createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where('user.id = :userId', { userId })
    .getOne();
  return {
    id: `${user.id}`,
    avatarUrl: user.avatarUrl,
    email: user.email,
    isLoggedIn: true,
  };
};
