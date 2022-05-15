import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Navigation from '../../block/navigation';
import { Button, Container } from '@mui/material';
import { UserResponse } from '@main/rest-models';
import { BalanceProvider } from '../../hooks/balance';
import { page, theme } from '../../providers/theme';
import { DropProvider } from '../../hooks/drop';
import { useSession, signIn, signOut } from 'next-auth/react';

interface Props {
  user?: UserResponse;
  children?: React.ReactNode;
}

const Page = ({ children, user }: Props) => {
  const { data: session } = useSession();

  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation user={user} />
        <main>
          <Container
            sx={{
              pt: 16,
              maxWidth: page.maxWidth,
            }}
          >
            {children}
          </Container>
        </main>
      </ThemeProvider>
    );
  }

  return (
    <DropProvider>
      <BalanceProvider user={user}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navigation user={user} />
          <main>
            <Container
              sx={{
                pt: 16,
                maxWidth: page.maxWidth,
              }}
            >
              {children}
            </Container>
          </main>
        </ThemeProvider>
      </BalanceProvider>
    </DropProvider>
  );
};

export default Page;
