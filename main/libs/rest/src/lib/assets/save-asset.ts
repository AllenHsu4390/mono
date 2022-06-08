import { environment } from '@main/environment';

export const saveAsset = async (
  creatorId: string,
  src: string
): Promise<void> => {
  const db = environment.db;

  await db.save.asset(creatorId, src);
};
