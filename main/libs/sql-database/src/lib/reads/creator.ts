import { connectToDatabase } from '../db';
import { Creator } from '../entity/creator';
import { decode, encode } from '@main/hash';

export const getCreator = async (id: string) => {
  const db = await connectToDatabase();
  const creatorId = decode(id);
  const creator = await db.getRepository(Creator).findOneOrFail({
    where: {
      id: creatorId,
    },
  });
  return {
    id: encode(creator.id),
    avatarUrl: creator.avatarUrl,
    name: creator.name,
    desc: creator.description,
  };
};
