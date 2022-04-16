import { connectToDatabase } from '../db';
import { Creator } from '../entity/creator';

export const getCreator = async (id) => {
  const db = await connectToDatabase();
  const creatorId = Number(id);
  const creator = await db
    .createQueryBuilder()
    .select('creator')
    .from(Creator, 'creator')
    .where('creator.id = :creatorId', { creatorId })
    .getOne();
  return {
    id: `${creator.id}`,
    avatarUrl: creator.avatarUrl,
    name: creator.name,
    desc: creator.description,
  };
};
