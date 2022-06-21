import { CreatorResponse, UserResponse } from '@main/rest-models';
import { noop } from 'lodash';
import { createContext, useContext } from 'react';
import { useQuery } from 'react-query';

interface CreatorContextResult {
  creator: CreatorResponse | undefined;
  refetchCreator(): void;
}

export const CreatorContext = createContext<CreatorContextResult>({
  creator: undefined,
  refetchCreator: noop,
});

export const useCreator = () => {
  return useContext(CreatorContext);
};

interface CreatorProviderProps {
  user: UserResponse;
  children?: React.ReactNode;
}

export const CreatorProvider = ({ user, children }: CreatorProviderProps) => {
  const { data, refetch } = useQuery<CreatorResponse>(
    ['creator', user.creatorId],
    async () => {
      const res = await fetch(user.links.creator);
      return res.json();
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <CreatorContext.Provider value={{ creator: data, refetchCreator: refetch }}>
      {children}
    </CreatorContext.Provider>
  );
};
