export const createSkip = (page: number, pageSize: number): number => {
  const skip = (page - 1) * pageSize;

  return skip;
};

export const createCursor = (page: number, pageSize: number, total: number) => {
  if (total === 0) {
    return {
      total: 0,
    };
  }

  const pageCount = Math.ceil(total / pageSize);
  const next = page + 1;
  const prev = page - 1;

  return {
    total,
    ...(next <= pageCount ? { next: `${next}` } : {}),
    ...(prev > 0 ? { prev: `${prev}` } : {}),
  };
};
