import { BalanceResponse, UserResponse } from '@main/rest-models';
import { noop } from 'lodash';
import { createContext, useContext } from 'react';
import { useQuery } from 'react-query';

interface Result {
  balance: BalanceResponse | undefined;
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
  user: UserResponse;
  children?: React.ReactNode;
}

export const BalanceProvider = ({ user, children }: BalanceProviderProps) => {
  const { data, refetch } = useQuery<BalanceResponse>(
    ['balance', user.id],
    async () => {
      const balanceUrl = user.links.balance.url;
      if (!balanceUrl) {
        throw new Error('missing balance capability');
      }
      const res = await fetch(balanceUrl);
      return res.json();
    }
  );
  return (
    <BalanceContext.Provider value={{ balance: data, refetchBalance: refetch }}>
      {children}
    </BalanceContext.Provider>
  );
};
