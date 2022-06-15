import { ScrollResetProvider } from '../hooks/use-scroll-reset';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from './theme';
import { SessionProvider } from '../hooks/use-session';
import { ThemeProvider } from '@mui/material/styles';
import { UserResponse } from '@main/rest-models';
import { UserProvider } from '../hooks/use-user';
import { DropProvider } from '../hooks/use-drop';
import { BalanceProvider } from '../hooks/use-balance';
import { CreatorProvider } from '../hooks/use-creator';

const queryClient = new QueryClient();

export interface WithUserProps {
  user?: UserResponse | null;
}

interface ReactChildren {
  children: React.ReactNode;
}

export const AppProvider = ({
  user,
  children,
}: WithUserProps & ReactChildren) => {
  if (user) {
    return (
      <QueryClientProvider client={queryClient}>
        <ScrollResetProvider>
          <SessionProvider>
            <UserProvider user={user}>
              <CreatorProvider user={user}>
                <DropProvider>
                  <BalanceProvider user={user}>
                    <ThemeProvider theme={theme}>{children}</ThemeProvider>
                  </BalanceProvider>
                </DropProvider>
              </CreatorProvider>
            </UserProvider>
          </SessionProvider>
        </ScrollResetProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollResetProvider>
        <SessionProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </SessionProvider>
      </ScrollResetProvider>
    </QueryClientProvider>
  );
};
