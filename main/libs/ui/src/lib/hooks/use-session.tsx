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
      return {
        isUsualClient: true,
        isLoggedIn: false,
        links: {
          login: {
            rel: 'login',
            url: '/api/login',
          },
          logout: {
            rel: 'logout',
            url: '/api/logout',
          },
          session: {
            rel: 'session',
            url: '/api/session',
          },
        },
      };
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
