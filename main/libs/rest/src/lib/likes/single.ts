import { cache } from '@main/cache';
import { environment } from '@main/environment';
import { Like, Response } from '@main/models';

export const saveLike = async (like: Like): Promise<Response> => {
  const db = environment().db;
  await cache.save.like(like.assetId, () => db.save.like(like));

  const links = [];

  return {
    links,
  };
};
