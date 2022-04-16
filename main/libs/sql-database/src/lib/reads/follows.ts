import { Follows } from '@main/models';
import { connectToDatabase } from '../db';
import { Follow } from '../entity/follow';
import { createCursor, createSkip } from '../pagination';

const PAGE_SIZE = 20;

export const getFollows = async (
  id: string,
  pageId: string
): Promise<Follows> => {
  const db = await connectToDatabase();
  const page = Number(pageId);
  const userId = Number(id);

  const [follows, total] = await db.getRepository(Follow).findAndCount({
    where: {
      user: {
        id: userId,
      },
    },
    relations: ['creator'],
    take: PAGE_SIZE,
    skip: createSkip(page, PAGE_SIZE),
  });
  return {
    follows: follows.map((f) => ({
      id: `${f.id}`,
      creator: {
        name: f.creator.name,
        id: `${f.creator.id}`,
        avatarUrl: f.creator.avatarUrl,
        desc: f.creator.description,
      },
    })),
    pagination: createCursor(page, PAGE_SIZE, total),
  };
};
