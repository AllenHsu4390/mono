import { ScrollResetProvider } from '../hooks/use-scroll-reset';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { UserProvider } from '../hooks/use-user';
import type { GuestResponse, UserResponse } from '@main/rest-models';
import { DropProvider } from '../hooks/use-drop';
import { BalanceProvider } from '../hooks/use-balance';
import { CreatorProvider } from '../hooks/use-creator';
import { GuestProvider } from '../hooks/use-guest';
import { CategoriesProvider } from '../hooks/use-categories';

const queryClient = new QueryClient();

export interface UserProps {
  user?: UserResponse | null;
}

export interface GuestProps {
  guest?: GuestResponse | null;
}

interface ReactChildren {
  children: React.ReactNode;
}

export const AppProvider = ({
  user,
  guest,
  children,
}: UserProps & GuestProps & ReactChildren) => {
  if (user) {
    return (
      <QueryClientProvider client={queryClient}>
        <ScrollResetProvider>
          <UserProvider user={user}>
            <CreatorProvider user={user}>
              <CategoriesProvider>
                <DropProvider>
                  <BalanceProvider user={user}>
                    <ThemeProvider theme={theme}>{children}</ThemeProvider>
                  </BalanceProvider>
                </DropProvider>
              </CategoriesProvider>
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
            <CategoriesProvider>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </CategoriesProvider>
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
