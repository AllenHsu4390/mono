import NodeCache from 'node-cache';

const DEFAULT_TTL = 3600000; // 1 hours

const memoryCache = new NodeCache({
  maxKeys: 1000000,
});

const getLikesCount = async (
  assetId: string,
  dbGet: () => Promise<number>
): Promise<number> => {
  const key = `likes-count-{${assetId}}`;
  if (!memoryCache.has(key)) {
    const value = await dbGet();
    memoryCache.set(key, value, DEFAULT_TTL);
  }

  // guaranteed
  return memoryCache.get(key) as number;
};

const saveLikesCount = async (assetId: string, dbSave: () => Promise<void>) => {
  const key = `likes-count-{${assetId}}`;
  if (memoryCache.has(key)) {
    const value = Number(memoryCache.get(key));
    memoryCache.set(key, value + 1, DEFAULT_TTL);
  }
  await dbSave();
};

export const cache = {
  get: {
    likesCount: getLikesCount,
  },
  save: {
    like: saveLikesCount,
  },
};
