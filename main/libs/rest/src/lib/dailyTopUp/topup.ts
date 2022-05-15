import { environment } from '@main/environment';
import { DailyTopUpResponse, Gain } from '@main/rest-models';

export const saveDailyTopUp = async (
  topUpId: string,
  userId: string
): Promise<DailyTopUpResponse> => {
  const db = environment.db;

  await db.save.dailyTopUp(topUpId, userId, Gain.TopUpLarge);

  return {
    hasToppedUp: true,
  };
};
