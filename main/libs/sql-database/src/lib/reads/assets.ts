import { Assets } from '@main/models';
import { connectToDatabase } from '../db';
import { Asset } from '../entity/asset';
import { decode, encode } from '../hash';
import { createCursor, createSkip } from '../pagination';

const PAGE_SIZE = 4;

export const getAssets = async (
  id: string,
  pageId: string
): Promise<Assets> => {
  const db = await connectToDatabase();
  const page = Number(pageId);
  const creatorId = decode(id);
  const [assets, total] = await db.getRepository(Asset).findAndCount({
    where: {
      creator: {
        id: creatorId,
      },
    },
    skip: createSkip(page, PAGE_SIZE),
    take: PAGE_SIZE,
  });
  return {
    assets: assets.map((a) => ({
      id: encode(a.id),
      src: a.src,
    })),
    pagination: createCursor(page, PAGE_SIZE, total),
  };
};
