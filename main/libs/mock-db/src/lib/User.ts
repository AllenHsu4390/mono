import { Base } from './Base';
import { dbGet } from './db';
import * as models from '@main/models';

export class User extends Base {
  private id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  get(): Promise<models.User> {
    return dbGet('User', this.id) as Promise<models.User>;
  }
}
