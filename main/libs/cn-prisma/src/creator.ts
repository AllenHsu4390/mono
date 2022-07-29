import { decode, encode } from '@main/hash';
import { prisma } from './prisma';

export const getCreator = async (id: string) => {
  const creatorId = decode(id);
  const creator = await prisma.creator.findFirstOrThrow({
    where: { id: creatorId },
  });

  return {
    id: encode(creator.id),
    avatarUrl: creator.avatarUrl,
    name: creator.name,
    desc: creator.description,
  };
};
