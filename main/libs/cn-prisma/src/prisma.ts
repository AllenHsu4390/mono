import { PrismaClient } from '@prisma/client';
import { getAssets } from './asset';
import { getCreator } from './creator';

export const prisma = new PrismaClient();

export const prismaDb = {
  creator: {
    get: getCreator,
  },
  assets: {
    get: getAssets,
  },
};
