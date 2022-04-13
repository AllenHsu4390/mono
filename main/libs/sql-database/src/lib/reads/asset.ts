import { connectToDatabase } from '../db';
import { Asset } from '../entity/asset';

export const getAsset = async (id) => {
  const db = await connectToDatabase();
  const assetId = Number(id);
  const asset = await db
    .createQueryBuilder()
    .select('asset')
    .from(Asset, 'asset')
    .where('asset.id = :assetId', { assetId })
    .getOne();
  return {
    id: `${asset.id}`,
    src: asset.src,
  };
};
