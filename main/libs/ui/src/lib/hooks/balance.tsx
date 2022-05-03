import { Balance, User } from '@main/models';
import { UserResponse } from '@main/rest';
import { noop } from 'lodash';
import { createContext, useContext } from 'react';
import { useQuery } from 'react-query';

interface Result {
  balance: Balance | undefined;
  refetchBalance(): void;
}

export const BalanceContext = createContext<Result>({
  balance: undefined,
  refetchBalance: noop,
});

export const useBalance = () => {
  return useContext(BalanceContext);
};

interface BalanceProviderProps {
  user: User & UserResponse;
  children?: React.ReactNode;
}

export const BalanceProvider = ({ user, children }: BalanceProviderProps) => {
  const { data, refetch } = useQuery<Balance>(
    ['balance', user.id],
    async () => {
      const balanceLink = user.links.find((l) => l.rel === 'balance');
      if (!balanceLink) {
        throw new Error('missing balance capability');
      }
      const res = await fetch(balanceLink.url);
      return res.json();
    }
  );
  return (
    <BalanceContext.Provider value={{ balance: data, refetchBalance: refetch }}>
      {children}
    </BalanceContext.Provider>
  );
};
