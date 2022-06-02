import { Gain } from '@main/rest-models';
import { useMutation } from 'react-query';
import { useUser } from './use-user';

export const useDailyTopUp = ({ onError }: { onError?(error: any): void }) => {
  const { user, refetchUser } = useUser();
  const mutation = useMutation(
    async () => {
      if (!user || !user.links.dailyTopUp) {
        throw new Error('Missing capability daily-top-up');
      }
      const res = await fetch(user.links.dailyTopUp.url || '/404', {
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
