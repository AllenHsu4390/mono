import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { userAtom } from '../hooks/use-user';
import type { GuestResponse, UserResponse } from '@main/rest-models';
import { guestAtom } from '../hooks/use-guest';
import { Provider as JotaiProvider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

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

const JotaiHydrationProvider = ({
  user,
  guest,
  children,
}: UserProps & GuestProps & ReactChildren) => {
  useHydrateAtoms([
    [userAtom, user],
    [guestAtom, guest],
  ]);

  return <>{children}</>;
};

export const AppProvider = ({
  user,
  guest,
  children,
}: UserProps & GuestProps & ReactChildren) => {
  if (user) {
    return (
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <JotaiHydrationProvider user={user} guest={guest}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </JotaiHydrationProvider>
        </JotaiProvider>
      </QueryClientProvider>
    );
  }

  if (guest) {
    return (
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <JotaiHydrationProvider user={user} guest={guest}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </JotaiHydrationProvider>
        </JotaiProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <JotaiHydrationProvider user={user} guest={guest}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </JotaiHydrationProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
};
