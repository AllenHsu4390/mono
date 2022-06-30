import { EntityManager } from 'typeorm';
import { connectToDatabase } from '../db';
import { decode, encode } from '@main/hash';
import { Session } from '../entity/session';

export const createSession = async (
  userId: string,
  manager?: EntityManager
) => {
  const db = manager || (await connectToDatabase());
  const savedSession = await db.transaction(async (manager) => {
    const newSession = new Session();
    newSession.userId = decode(userId);
    newSession.updatedAt = new Date();
    newSession.isLoggedIn = false;
    return await manager.save(newSession);
  });

  return {
    id: encode(savedSession.id),
    isLoggedIn: savedSession.isLoggedIn,
    userId: encode(savedSession.userId),
  };
};

export const updateSession = async (
  sessionId: string,
  manager?: EntityManager
) => {
  const db = manager || (await connectToDatabase());
  const savedSession = await db.transaction(async (manager) => {
    const existingSession = await manager.getRepository(Session).findOneOrFail({
      where: {
        id: decode(sessionId),
      },
    });
    existingSession.isLoggedIn = true;
    return await manager.save(existingSession);
  });

  return {
    id: encode(savedSession.id),
    isLoggedIn: savedSession.isLoggedIn,
    userId: encode(savedSession.userId),
  };
};

export const deleteSession = async (sessionId: string) => {
  const db = await connectToDatabase();

  await db.transaction(async (manager) => {
    return await manager.delete(Session, { id: decode(sessionId) });
  });
};
