import { Gain } from '@main/rest-models';
import { useMutation } from 'react-query';

export const useSendMint = ({ onError }: { onError?(error: any): void }) => {
  const mutation = useMutation(
    async () => {
      const res = await fetch('/api/transactions/mint', {
        method: 'POST',
      });
      return res.json();
    },
    {
      onError: (error) => {
        onError && onError(error);
      },
    }
  );

  return {
    sendMint: mutation.mutateAsync,
    creditAmount: Gain.TopUpSmall,
  };
};
