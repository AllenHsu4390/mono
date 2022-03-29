import { dbGet, dbSave } from '@main/mock-db';
import { Assets, User, Asset, Creator, Users } from '@main/models';

interface Database {
  get: {
    asset(id: string): Promise<Asset>;
    assets(id: string): Promise<Assets>;
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

export function environment(): Environment {
  return {
    db: {
      get: dbGet,
      save: dbSave,
    },
  };
}
