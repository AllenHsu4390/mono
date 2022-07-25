import type { BalanceResponse } from '@main/rest-models';
import { atom, useAtom } from 'jotai';
import { useQuery } from 'react-query';
import { useUser } from './use-user';

const counterAtom = atom({
  count: 0,
  isInitial: true,
});

const useCounter = () => {
  const [state, setState] = useAtom(counterAtom);
  return {
    state,
    setCount: (count: number) =>
      setState({
        isInitial: false,
        count,
      }),
  };
};

const isBalanceLoadingAtom = atom(false);

export const useBalance = ({
  onSuccess,
}: {
  onSuccess?(balance: BalanceResponse): void;
} = {}) => {
  const { user } = useUser();
  const [isBalanceLoading, setIsBalanceLoading] = useAtom(isBalanceLoadingAtom);
  const counter = useCounter();
  const {
    data: balance,
    refetch,
    isError,
    isRefetching,
    isLoading,
  } = useQuery<BalanceResponse>(
    ['balance'],
    async () => {
      if (!user?.links.balance) {
        throw new Error('Missing capability: balance');
      }
      const res = await fetch(user?.links.balance);
      return res.json();
    },
    {
      onSuccess: counter.state.isInitial
        ? (balanceData) => counter.setCount(balanceData.sum)
        : undefined,
    }
  );

  return {
    counter,
    balance,
    isError,
    isRefetching,
    isBalanceLoading,
    isLoading,
    refetchBalance: refetch,
    startBalanceLoading: () => setIsBalanceLoading(true),
    stopBalanceLoading: () => setIsBalanceLoading(false),
  };
};
