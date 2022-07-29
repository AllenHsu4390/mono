import { decode, encode } from '@main/hash';

export const createCursor = (take: number, cursorId?: string) => {
  return {
    cursor: cursorId
      ? {
          id: decode(cursorId),
        }
      : undefined,
    skip: cursorId ? 1 : undefined,
    take,
  };
};

export const createPagination = (
  results: { id: number }[],
  cursor?: number
) => {
  const last = results[results.length - 1];
  return {
    ...(last
      ? {
          next: encode(last.id),
        }
      : {}),
    ...(cursor
      ? {
          prev: encode(cursor),
        }
      : {}),
  };
};
