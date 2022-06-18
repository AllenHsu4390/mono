import { EntityManager } from 'typeorm';
import { connectToDatabase } from '../db';
import { decode, encode } from '@main/hash';
import { Session } from '../entity/session';

export const saveSession = async (
  userId: string,
  manager?: EntityManager
): Promise<{ id: string }> => {
  const db = manager || (await connectToDatabase());
  const savedSession = await db.transaction(async (manager) => {
    const foundSession = await manager.getRepository(Session).findOne({
      where: {
        userId: decode(userId),
      },
    });

    if (foundSession) {
      foundSession.updatedAt = new Date();
      return await manager.save(foundSession);
    }

    const dbSession = new Session();
    dbSession.userId = decode(userId);
    dbSession.updatedAt = new Date();
    return await manager.save(dbSession);
  });

  return {
    id: encode(savedSession.id),
  };
};
