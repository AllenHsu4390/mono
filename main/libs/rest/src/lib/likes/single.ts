import { environment } from '@main/environment';
import { Like, Response } from '@main/models';

export const saveLike = async (like: Like): Promise<Response> => {
  const db = environment.db;
  const cache = environment.cache;
  await cache.save.like(like.assetId, () => db.save.like(like));

  const links = [];

  return {
    links,
  };
};
