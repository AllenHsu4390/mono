import { connectToDatabase } from '../db';
import { Asset } from '../entity/asset';

export const getAsset = async (id) => {
  const db = await connectToDatabase();
  const assetId = Number(id);
  const asset = await db.getRepository(Asset).findOne({
    where: {
      id: assetId,
    },
  });
  return {
    id: `${asset.id}`,
    src: asset.src,
  };
};
