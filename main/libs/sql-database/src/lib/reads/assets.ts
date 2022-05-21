import { connectToDatabase } from '../db';
import { Asset } from '../entity/asset';
import { decode, encode } from '@main/hash';
import { createCursor, createSkip } from '../pagination';

const PAGE_SIZE = 4;

export const getAssets = async (id: string, pageId: string) => {
  const db = await connectToDatabase();
  const page = Number(pageId);
  const creatorId = decode(id);
  const [assets, total] = await db.getRepository(Asset).findAndCount({
    where: {
      creatorId,
    },
    relations: ['creator'],
    skip: createSkip(page, PAGE_SIZE),
    take: PAGE_SIZE,
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
    pagination: createCursor(page, PAGE_SIZE, total),
  };
};

export const getTopAssets = async (pageId: string) => {
  const db = await connectToDatabase();
  const page = Number(pageId);
  const [assets, total] = await db.getRepository(Asset).findAndCount({
    relations: ['creator'],
    skip: createSkip(page, PAGE_SIZE),
    take: PAGE_SIZE,
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
    pagination: createCursor(page, PAGE_SIZE, total),
  };
};
