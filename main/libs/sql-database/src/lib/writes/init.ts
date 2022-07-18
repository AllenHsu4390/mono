import { getUser } from '../reads/user';
import { saveUser } from '../writes/user';
import { saveAsset } from '../writes/asset';

const assets = [
  'https://source.unsplash.com/collection/540',
  'https://source.unsplash.com/collection/862',
  'https://source.unsplash.com/collection/152',
  'https://source.unsplash.com/collection/658',
  'https://source.unsplash.com/collection/363',
  'https://source.unsplash.com/collection/714',
  'https://source.unsplash.com/collection/474',
  'https://source.unsplash.com/collection/264',
  'https://source.unsplash.com/collection/412',
  'https://source.unsplash.com/collection/124',
  'https://source.unsplash.com/collection/631',
  'https://source.unsplash.com/collection/123',
  'https://source.unsplash.com/collection/111',
  'https://source.unsplash.com/collection/222',
  'https://source.unsplash.com/collection/434',
  'https://source.unsplash.com/collection/424',
  'https://source.unsplash.com/collection/664',
  'https://source.unsplash.com/collection/326',
  'https://source.unsplash.com/collection/768',
  'https://source.unsplash.com/collection/414',
  'https://source.unsplash.com/collection/235',
];

const assetBatches = [
  assets.slice(0, 5),
  assets.slice(5, 10),
  assets.slice(10, 20),
];

const emails = [
  'test1@testland.com',
  'test2@testland.com',
  'test3@testland.com',
];

export const devInit = async () => {
  emails.forEach(async (email, index) => {
    const saved = await saveUser(email, 5000);
    const user = await getUser(saved.id);

    assetBatches[index].forEach(async (asset) => {
      // consider passing in src
      await saveAsset(user.creatorId, 'cdn-token');
    });
  });
};
