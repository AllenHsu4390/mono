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

export const deleteAsset = async (assetId: string, creatorId: string) => {
  const db = await connectToDatabase();

  return await db.transaction(async (manager) => {
    const asset = await manager.getRepository(Asset).findOneOrFail({
      where: {
        id: decode(assetId),
      },
    });

    if (asset.creatorId !== decode(creatorId)) {
      throw new Error('Asset creator did not match requestor');
    }

    return await manager.delete(Asset, { id: decode(assetId) });
  });
};
