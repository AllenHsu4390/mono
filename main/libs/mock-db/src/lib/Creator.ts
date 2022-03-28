import { Base } from './Base';
import { dbGet } from './db';
import * as models from '@main/models';

export class Creator extends Base {
  private id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  get(): Promise<models.Creator> {
    return dbGet('Creator', this.id) as Promise<models.Creator>;
  }
}
