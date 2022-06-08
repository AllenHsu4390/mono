import { connectToDatabase } from '../db';
import { decode, encode } from '@main/hash';
import { Asset } from '../entity/asset';

export const saveAsset = async (creatorId: string, src: string) => {
  const db = await connectToDatabase();

  return await db.transaction(async (manager) => {
    const dbAsset = new Asset();
    dbAsset.creatorId = decode(creatorId);
    dbAsset.src = src;
    const dbAssetSaved = await manager.save(dbAsset);

    return {
      id: encode(dbAssetSaved.id),
    };
  });
};
