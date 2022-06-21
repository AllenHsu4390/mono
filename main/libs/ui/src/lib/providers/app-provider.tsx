import { ScrollResetProvider } from '../hooks/use-scroll-reset';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { UserProvider } from '../hooks/use-user';
import { GuestResponse, UserResponse } from '@main/rest-models';
import { DropProvider } from '../hooks/use-drop';
import { BalanceProvider } from '../hooks/use-balance';
import { CreatorProvider } from '../hooks/use-creator';
import { GuestProvider } from '../hooks/use-guest';

const queryClient = new QueryClient();

export interface WithUserProps {
  user?: UserResponse | null;
}

export interface WithGuestProps {
  guest?: GuestResponse | null;
}

interface ReactChildren {
  children: React.ReactNode;
}

export const AppProvider = ({
  user,
  guest,
  children,
}: WithUserProps & WithGuestProps & ReactChildren) => {
  if (user) {
    return (
      <QueryClientProvider client={queryClient}>
        <ScrollResetProvider>
          <UserProvider user={user}>
            <CreatorProvider user={user}>
              <DropProvider>
                <BalanceProvider user={user}>
                  <ThemeProvider theme={theme}>{children}</ThemeProvider>
                </BalanceProvider>
              </DropProvider>
            </CreatorProvider>
          </UserProvider>
        </ScrollResetProvider>
      </QueryClientProvider>
    );
  }

  if (guest) {
    return (
      <QueryClientProvider client={queryClient}>
        <ScrollResetProvider>
          <GuestProvider guest={guest}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </GuestProvider>
        </ScrollResetProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollResetProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ScrollResetProvider>
    </QueryClientProvider>
  );
};
