import { useMutation } from 'react-query';
import { useUser } from './use-user';

// MOVE
export const Gain = {
  TopUpSmall: 200,
  TopUpMedium: 1000,
  TopUpLarge: 5000,
  DailyTopUp: 2000,
};

export const useDailyTopUp = ({ onError }: { onError?(error: any): void }) => {
  const { user, refetchUser } = useUser();
  const mutation = useMutation(
    async () => {
      if (!user?.links.dailyTopUp) {
        throw new Error('Missing capability: daily-top-up');
      }
      const res = await fetch(user.links.dailyTopUp, {
        method: 'POST',
      });
      await refetchUser();
      return res.json();
    },
    {
      onError: (error) => {
        onError && onError(error);
      },
    }
  );

  return {
    sendDailyTopUp: mutation.mutateAsync,
    creditAmount: Gain.DailyTopUp,
    isAvailable: !!user?.links.dailyTopUp,
  };
};
