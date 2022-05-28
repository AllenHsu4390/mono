import { SessionResponse } from '@main/rest-models';
import { createContext, useContext } from 'react';
import { useQuery } from 'react-query';

interface SessionContextResult {
  session: SessionResponse | undefined;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const SessionContext = createContext<SessionContextResult>({
  session: undefined,
});

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }: ProviderProps) => {
  const { data } = useQuery<SessionResponse>(
    'session',
    async () => {
      const res = await fetch('/api/session');
      return res.json();
    },
    {
      refetchInterval: 5000,
    }
  );
  return (
    <SessionContext.Provider value={{ session: data }}>
      {children}
    </SessionContext.Provider>
  );
};
