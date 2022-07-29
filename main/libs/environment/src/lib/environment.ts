import { db } from '@main/sql-database';
import { cache } from '@main/cache';
import { Assets, User } from '@main/rest-models';
import { prismaDb } from '@main/cn-prisma';

export const environment = {
  db: {
    ...db,
    ...prismaDb,
  },
  cache: {
    likesCount: cache.repository<number>('likes-count'),
    balance: cache.repository<number>('balance'),
    user: cache.repository<User>('user'),
    topAssets: cache.repository<Assets>('assets'),
  },
};
