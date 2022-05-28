import { UserResponse } from '@main/rest-models';
import { noop } from 'lodash';
import { createContext, useContext } from 'react';
import { useQuery } from 'react-query';

interface SessionContextResult {
  user: UserResponse | undefined;
  refetchUser(): void;
}

export const SessionContext = createContext<SessionContextResult>({
  user: undefined,
  refetchUser: noop,
});

export const useSession = () => {
  return useContext(SessionContext);
};

interface UserProviderProps {
  user: UserResponse;
  children?: React.ReactNode;
}

export const UserProvider = ({ user, children }: UserProviderProps) => {
  const { data, refetch } = useQuery<UserResponse>(
    ['user', user.id],
    async () => {
      const res = await fetch(user.links.me.url);
      return res.json();
    },
    {
      initialData: user,
    }
  );
  return (
    <UserContext.Provider value={{ user: data, refetchUser: refetch }}>
      {children}
    </UserContext.Provider>
  );
};
