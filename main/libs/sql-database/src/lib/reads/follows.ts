import { connectToDatabase } from '../db';
import { Follow } from '../entity/follow';
import { decode, encode } from '../hash';
import { createCursor, createSkip } from '../pagination';

const PAGE_SIZE = 20;

export const getFollows = async (id: string, pageId: string) => {
  const db = await connectToDatabase();
  const page = Number(pageId);
  const userId = decode(id);

  const [follows, total] = await db.getRepository(Follow).findAndCount({
    where: {
      userId,
    },
    relations: ['creator'],
    take: PAGE_SIZE,
    skip: createSkip(page, PAGE_SIZE),
  });
  return {
    follows: follows.map((f) => ({
      id: encode(f.id),
      creator: {
        name: f.creator.name,
        id: encode(f.creator.id),
        avatarUrl: f.creator.avatarUrl,
        desc: f.creator.description,
      },
    })),
    pagination: createCursor(page, PAGE_SIZE, total),
  };
};
