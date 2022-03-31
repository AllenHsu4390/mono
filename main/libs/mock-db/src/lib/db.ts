import { Assets, User, Asset, Creator, Users } from '@main/models';
import * as _ from 'lodash';

// generate mocks
const ASSET_SIZE = 100;
const PAGE_SIZE = 10;
const ASSETS_SIZE = ASSET_SIZE / PAGE_SIZE;
export const ASSET_INDEX_OFFSET = 354;

const user: User[] = [
  {
    id: '0',
    avatarUrl: 'https://source.unsplash.com/random/300x300',
    email: 'someguy@someemail.com',
    isLoggedIn: false,
  },
];

const users: Users[] = [
  {
    users: [user[0]],
    pagination: {
      total: 1,
    },
  },
];

const creator: Creator[] = [
  {
    id: '0',
    desc: "Hi, I'm a creator. I make cool things. Check out my work!",
    avatarUrl: 'https://source.unsplash.com/random/500x500',
  },
];

const asset = Array(100)
  .fill(0)
  .map((_, index) => {
    const number = ASSET_INDEX_OFFSET + index;
    return {
      id: `${number}`,
      src: `https://source.unsplash.com/collection/${number}`,
    };
  });

const assetChunks = _.chunk(asset, 10);
const assets = Array(ASSETS_SIZE)
  .fill(0)
  .map((_, i) => {
    const next: number = i + 1;
    const prev: number = i - 1;
    return {
      assets: assetChunks[i],
      pagination: {
        next: next > assetChunks.length ? undefined : `${next}`,
        prev: prev < 0 ? undefined : `${prev}`,
        total: ASSET_SIZE,
      },
    };
  });

type Keys = 'Assets' | 'User' | 'Creator' | 'Asset' | 'Users';
type Values = Asset | Assets | Creator | User | Users;

export type Db = Map<Keys, Values[]>;

export const db: Db = new Map<Keys, Values[]>([
  ['Assets', assets],
  ['User', user],
  ['Creator', creator],
  ['Asset', asset],
  ['Users', users],
]);

export const dbGet = {
  asset: async (id: string): Promise<Asset> => {
    const dbId = Number(id) - ASSET_INDEX_OFFSET;
    return db.get('Asset')[dbId] as Asset;
  },
  assets: async (id: string): Promise<Assets> => {
    const dbId = Number(id);
    return db.get('Assets')[dbId] as Assets;
  },
  user: async (id: string): Promise<User> => {
    const dbId = Number(id);
    return db.get('User')[dbId] as User;
  },
  users: async (id: string): Promise<Users> => {
    const dbId = Number(id);
    return db.get('Users')[dbId] as Users;
  },
  creator: async (id: string): Promise<Creator> => {
    const dbId = Number(id);
    return db.get('Creator')[dbId] as Creator;
  },
};

export const dbSave = {
  user: async (user: User): Promise<void> => {
    const userData = db.get('User');
    if (userData[Number(user.id)]) {
      userData[Number(user.id)] = user;
    }
    userData.push(user);
  },
};
