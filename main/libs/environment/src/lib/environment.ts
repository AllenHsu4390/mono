import { Assets, User, Asset, Creator, Follows, Like } from '@main/models';
import { db } from '@main/sql-database';
import { cache } from '@main/cache';

interface Database {
  get: {
    asset(id: string): Promise<Asset>;
    assets(creatorId: string, pageId: string): Promise<Assets>;
    user(id: string): Promise<User>;
    creator(id: string): Promise<Creator>;
    follows(userId: string, pageId: string): Promise<Follows>;
    likesCount(assetId: string): Promise<number>;
    userId(email: string): Promise<string>;
  };
  save: {
    like(like: Like): Promise<void>;
  };
}

interface Cache {
  get: {
    likesCount(assetId: string, dbGet: () => Promise<number>): Promise<number>;
  };
  save: {
    like(assetId: string, dbSave: () => Promise<void>): Promise<void>;
  };
}

interface Environment {
  db: Database;
  cache: Cache;
}

export const environment: Environment = {
  db,
  cache,
};
