import { dbGet as mockGet, dbSave } from '@main/mock-db';
import { Assets, User, Asset, Creator, Users } from '@main/models';
import { db as sqlDb } from '@main/sql-database';

interface Database {
  get: {
    asset(id: string): Promise<Asset>;
    assets(creatorId: string, pageId: string): Promise<Assets>;
    user(id: string): Promise<User>;
    users(id: string): Promise<Users>;
    creator(id: string): Promise<Creator>;
  };
  save: {
    user(user: User): Promise<void>;
  };
}

interface Environment {
  db: Database;
}

const dbGet = {
  asset: sqlDb.get.asset,
  assets: sqlDb.get.assets,
  users: mockGet.users,
  user: sqlDb.get.user,
  creator: sqlDb.get.creator,
};

export function environment(): Environment {
  return {
    db: {
      get: dbGet,
      save: dbSave,
    },
  };
}
