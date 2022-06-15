import NodeCache from 'node-cache';

const DEFAULT_TTL = 3600000; // 1 hours

const memoryCache = new NodeCache({
  maxKeys: 1000000,
});

const cacheGet = async <T>(
  key: string,
  dbGet: () => Promise<T>
): Promise<T> => {
  if (!memoryCache.has(key)) {
    const value = await dbGet();
    memoryCache.set<T>(key, value, DEFAULT_TTL);
  }
  return memoryCache.get<T>(key);
};

const cacheSave = async <T>(key: string, transform: (value: T) => T) => {
  if (memoryCache.has(key)) {
    const value = memoryCache.get<T>(key);
    memoryCache.set<T>(key, transform(value), DEFAULT_TTL);
  }
};

const createCacheGetter = <T>(type: string) => {
  return async (id: string, dbGet: () => Promise<T>) => {
    return cacheGet(`${type}-${id}`, dbGet);
  };
};

const createCacheSaver = <T>(type: string) => {
  return async (id: string, transform: (value: T) => T) => {
    return cacheSave(`${type}-${id}`, transform);
  };
};

export const cache = {
  repository: <T>(type: string) => {
    return {
      get: createCacheGetter<T>(type),
      save: createCacheSaver<T>(type),
    };
  },
};
