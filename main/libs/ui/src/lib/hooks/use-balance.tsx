import type { BalanceResponse } from '@main/rest-models';
import { useQuery } from 'react-query';
import { useUser } from './use-user';

export const useBalance = () => {
  const { user } = useUser();
  const { data: balance, refetch } = useQuery<BalanceResponse>(
    ['balance'],
    async () => {
      if (!user?.links.balance) {
        throw new Error('Missing capability: balance');
      }
      const res = await fetch(user?.links.balance);
      return res.json();
    }
  );

  return {
    balance,
    refetchBalance: refetch,
  };
};
