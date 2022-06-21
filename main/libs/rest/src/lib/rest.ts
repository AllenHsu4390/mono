import { deleteAsset } from './assets/delete-asset';
import { getAsset } from './assets/get-asset';
import { getAssets } from './assets/get-assets';
import { getTopAssets } from './assets/get-top-assets';
import { saveAsset } from './assets/save-asset';
import { getGuest } from './guests/get-guest';
import { getLikesCount } from './likes/get-likes-count';
import { saveLike } from './likes/save-like';
import { createSession } from './sessions/create-session';
import { deleteSession } from './sessions/delete-session';
import { getSession } from './sessions/get-session';
import { updateSession } from './sessions/update-session';
import { getBalance } from './transactions/get-balance';
import { getUser } from './users/get-user';
import { getUserIdByEmail } from './users/get-user-id-by-email';
import { saveUser } from './users/save-user';

export const rest = {
  users: {
    id: {
      byEmail: getUserIdByEmail,
    },
    byId: getUser,
    new: saveUser,
  },
  likes: {
    count: {
      byAsset: getLikesCount,
    },
    new: saveLike,
  },
  sessions: {
    update: updateSession,
    byId: getSession,
    delete: deleteSession,
    new: createSession,
  },
  guests: {
    start: getGuest,
  },
  transactions: {
    balance: {
      byUser: getBalance,
    },
  },
  assets: {
    new: saveAsset,
    top: getTopAssets,
    byCreator: getAssets,
    byId: getAsset,
    delete: deleteAsset,
  },
};
