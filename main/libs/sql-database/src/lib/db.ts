import { DataSource } from 'typeorm';
import { Asset } from './entity/asset';
import { Creator } from './entity/creator';
import { User } from './entity/user';
import { getAsset } from './reads/asset';
import { getAssets } from './reads/assets';
import { getCreator } from './reads/creator';
import { getUser } from './reads/user';

export const connectToDatabase = async () => {
  const datasource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'H>c$6H2xyA`VrR{B',
    database: 'creator_network',
    synchronize: true,
    logging: true,
    entities: [User, Creator, Asset],
  });

  return await datasource.initialize();
};

export const db = {
  get: {
    user: getUser,
    creator: getCreator,
    asset: getAsset,
    assets: getAssets,
  },
};
