import { decode, encode } from '@main/hash';
import { createCursor, createPagination } from './pagination';
import { prisma } from './prisma';

const PAGE_SIZE = 12;

export const getAssets = async (id: string, cursorId?: string) => {
  const creatorId = decode(id);
  const { cursor, skip, take } = createCursor(PAGE_SIZE, cursorId);
  const assets = await prisma.asset.findMany({
    where: {
      creatorId,
    },
    include: {
      creator: true,
    },
    cursor,
    skip,
    take,
  });
  return {
    assets: assets.map(({ id, creator, src }) => ({
      id: encode(id),
      creator: {
        id: encode(creator.id),
        name: creator.name,
        desc: creator.description,
        avatarUrl: creator.avatarUrl,
      },
      src,
    })),
    pagination: createPagination(assets, cursor?.id),
  };
};
