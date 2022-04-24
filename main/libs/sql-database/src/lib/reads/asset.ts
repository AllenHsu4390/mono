import { connectToDatabase } from '../db';
import { Asset } from '../entity/asset';
import { decode, encode } from '../hash';

export const getAsset = async (id: string) => {
  const db = await connectToDatabase();
  const assetId = decode(id);
  const asset = await db.getRepository(Asset).findOne({
    where: {
      id: assetId,
    },
    relations: ['creator'],
  });
  const creator = asset.creator;
  return {
    id: encode(asset.id),
    creator: {
      id: encode(creator.id),
      name: creator.name,
      desc: creator.description,
      avatarUrl: creator.avatarUrl,
    },
    src: asset.src,
  };
};
