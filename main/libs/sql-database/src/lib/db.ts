import { DataSource } from 'typeorm';
import { Asset } from './entity/asset';
import { Creator } from './entity/creator';
import { Follow } from './entity/follow';
import { User } from './entity/user';
import { getAsset } from './reads/asset';
import { getAssets, getTopAssets } from './reads/assets';
import { getCreator } from './reads/creator';
import { getUser, getUserId } from './reads/user';
import { getFollows } from './reads/follows';
import { Like } from './entity/like';
import { getLikesCount } from './reads/likes';
import { saveLike } from './writes/like';
import { Transaction, TransactionTypes } from './entity/transaction';
import { getBalance } from './reads/balance';
import { saveTransaction } from './writes/transaction';
import { DailyTopUp } from './entity/daily-top-up';
import { getDailyTopUp } from './reads/daily-top-up';
import { saveDailyTopUp } from './writes/daily-top-up';
import { deleteAsset, saveAsset } from './writes/asset';

const datasource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'H>c$6H2xyA`VrR{B',
  database: 'creator_network',
  synchronize: true,
  //logging: true,
  entities: [Creator, User, Asset, Follow, Like, Transaction, DailyTopUp],
});

export const connectToDatabase = async () => {
  if (datasource.isInitialized) {
    return datasource;
  }
  await datasource.initialize();
  return datasource;
};

export const db = {
  user: {
    get: getUser,
  },
  creator: {
    get: getCreator,
  },
  asset: {
    get: getAsset,
    save: saveAsset,
    delete: deleteAsset,
  },
  assets: {
    get: getAssets,
  },
  topAssets: {
    get: getTopAssets,
  },
  follows: {
    get: getFollows,
  },
  likesCount: {
    get: getLikesCount,
  },
  userId: {
    get: getUserId,
  },
  balance: {
    get: getBalance,
  },
  dailyTopUp: {
    get: getDailyTopUp,
    save: saveDailyTopUp,
  },
  like: {
    save: saveLike,
  },
  transaction: {
    save: saveTransaction,
  },
  enums: {
    transactionTypes: TransactionTypes,
  },
};
