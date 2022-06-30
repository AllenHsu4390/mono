import type { UserResponse } from '@main/rest-models';
import { noop } from 'lodash';
import { createContext, useContext } from 'react';
import { useQuery } from 'react-query';

interface UserContextResult {
  user: UserResponse | undefined;
  refetchUser(): void;
}

interface UserProviderProps {
  user: UserResponse;
  children?: React.ReactNode;
}

export const UserContext = createContext<UserContextResult>({
  user: undefined,
  refetchUser: noop,
});

export const UserProvider = ({ user, children }: UserProviderProps) => {
  const { data, refetch } = useQuery<UserResponse>(
    ['user'],
    async () => {
      const res = await fetch(user.links.me);
      return res.json();
    },
    {
      initialData: user,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <UserContext.Provider value={{ user: data, refetchUser: refetch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
