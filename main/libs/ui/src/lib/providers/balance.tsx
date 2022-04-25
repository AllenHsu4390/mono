import { Balance, User } from '@main/models';
import { UserResponse } from '@main/rest';
import { createContext, useContext } from 'react';
import { useQuery } from 'react-query';

export const BalanceContext = createContext<Balance | undefined>(undefined);

export const useBalance = () => {
  return useContext(BalanceContext);
};

export const BalanceProvider: React.FC<{ user: User & UserResponse }> = ({
  user,
  children,
}) => {
  const { data } = useQuery<Balance>(
    ['balance', user.id],
    async () => {
      const balanceLink = user.links.find((l) => l.rel === 'balance');
      if (!balanceLink) {
        throw new Error('missing balance capability');
      }
      const res = await fetch(balanceLink.url);
      return res.json();
    },
    {
      refetchInterval: 5000,
    }
  );
  return (
    <BalanceContext.Provider value={data}>{children}</BalanceContext.Provider>
  );
};
