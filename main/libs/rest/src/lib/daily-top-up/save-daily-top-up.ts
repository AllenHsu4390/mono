import { environment } from '@main/environment';
import { DailyTopUpResponse, Gain } from '@main/rest-models';

export const saveDailyTopUp = async (
  userId: string
): Promise<DailyTopUpResponse> => {
  const db = environment.db;

  await db.save.dailyTopUp(userId, Gain.DailyTopUp);

  return {
    hasToppedUp: true,
  };
};
