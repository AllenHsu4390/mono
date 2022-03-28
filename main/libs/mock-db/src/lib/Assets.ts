import { Base } from './Base';
import { dbGet } from './db';
import * as models from '@main/models';

export class Assets extends Base {
  private id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  get(): Promise<models.Assets> {
    return dbGet('Assets', this.id) as Promise<models.Assets>;
  }
}
