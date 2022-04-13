import { Assets } from '@main/models';
import { connectToDatabase } from '../db';
import { Asset } from '../entity/asset';

const PAGE_SIZE = 4;

export const getAssets = async (
  id: string,
  pageId: string
): Promise<Assets> => {
  const db = await connectToDatabase();
  const page = Number(pageId);
  const skip = (page - 1) * PAGE_SIZE;
  const creatorId = Number(id);
  const [assets, total] = await db
    .createQueryBuilder()
    .select('asset')
    .from(Asset, 'asset')
    .where('asset.creatorId = :creatorId', { creatorId })
    .take(PAGE_SIZE)
    .skip(skip)
    .getManyAndCount();
  const pageCount = total / PAGE_SIZE + 1;
  const next = page + 1;
  const prev = page - 1;
  return {
    assets: assets.map((a) => ({
      id: `${a.id}`,
      src: a.src,
    })),
    pagination: {
      total,
      next: next <= pageCount ? `${next}` : undefined,
      prev: prev > 0 ? `${prev}` : undefined,
    },
  };
};
