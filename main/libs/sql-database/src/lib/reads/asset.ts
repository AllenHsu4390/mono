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
  });
  return {
    id: encode(asset.id),
    src: asset.src,
  };
};
