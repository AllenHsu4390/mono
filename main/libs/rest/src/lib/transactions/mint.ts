import { environment } from '@main/environment';
import { Gain } from '@main/rest-models';

export const saveMint = async (userId: string): Promise<void> => {
  const db = environment.db;

  await db.save.transaction(
    db.enums.transactionTypes.MINT,
    userId,
    'mint',
    Gain.TopUpMedium,
    0
  );
};
