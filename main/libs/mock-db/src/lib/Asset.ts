import { Base } from './Base';
import { ASSET_INDEX_OFFSET, dbGet } from './db';
import * as models from '@main/models';

export class Asset extends Base {
  private id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  get(): Promise<models.Asset> {
    return dbGet(
      'Asset',
      `${Number(this.id) - ASSET_INDEX_OFFSET}`
    ) as Promise<models.Asset>;
  }
}
