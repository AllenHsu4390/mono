import { ScrollResetProvider } from '../hooks/use-scroll-reset';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from './theme';
import { SessionProvider } from '../hooks/use-session';
import { ThemeProvider } from '@mui/material/styles';
import { UserResponse } from '@main/rest-models';
import { UserProvider } from '../hooks/use-user';
import { DropProvider } from '../hooks/use-drop';
import { BalanceProvider } from '../hooks/use-balance';

const queryClient = new QueryClient();

interface Props {
  user?: UserResponse;
  children: React.ReactNode;
}

export const AppProvider = ({ user, children }: Props) => {
  if (user) {
    return (
      <QueryClientProvider client={queryClient}>
        <ScrollResetProvider>
          <SessionProvider>
            <UserProvider user={user}>
              <DropProvider>
                <BalanceProvider user={user}>
                  <ThemeProvider theme={theme}>{children}</ThemeProvider>
                </BalanceProvider>
              </DropProvider>
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
