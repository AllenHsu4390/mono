import * as mockDb from '@main/mock-db';

interface Environment {
  db: any;
}

export function environment(): Environment {
  return {
    db: mockDb as any,
  };
}
