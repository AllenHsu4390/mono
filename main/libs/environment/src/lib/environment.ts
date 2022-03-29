import { dbGet } from '@main/mock-db';
import { Assets, User, Asset, Creator, Users } from '@main/models';

interface Database {
  get: {
    asset(id: string): Asset;
    assets(id: string): Assets;
    user(id: string): User;
    users(id: string): Users;
    creator(id: string): Creator;
  };
}

interface Environment {
  db: Database;
}

export function environment(): Environment {
  return {
    db: {
      get: dbGet,
    },
  };
}
