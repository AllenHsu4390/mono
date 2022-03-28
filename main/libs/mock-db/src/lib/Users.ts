import { Base } from './Base';
import { dbGet } from './db';
import * as models from '@main/models';

export class Users extends Base {
  private id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  get(): Promise<models.Users> {
    return dbGet('Users', this.id) as Promise<models.Users>;
  }
}
