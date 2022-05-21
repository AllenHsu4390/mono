import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Navigation from '../../block/navigation';
import { Container } from '@mui/material';
import { UserResponse } from '@main/rest-models';
import { BalanceProvider } from '../../hooks/useBalance';
import { page, theme } from '../../providers/theme';
import { DropProvider } from '../../hooks/drop';
import { UserProvider } from '../../hooks/useUser';

interface Props {
  user?: UserResponse;
  children?: React.ReactNode;
}

interface LoggedInPageProps {
  user: UserResponse;
  children?: React.ReactNode;
}

const LoggedInPage = ({ user, children }: LoggedInPageProps) => {
  return (
    <UserProvider user={user}>
      <DropProvider>
        <BalanceProvider user={user}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navigation user={user} />
            <main>
              <Container
                sx={{
                  pt: '10rem',
                  pb: '10rem',
                  maxWidth: page.maxWidth,
                }}
              >
                {children}
              </Container>
            </main>
          </ThemeProvider>
        </BalanceProvider>
      </DropProvider>
    </UserProvider>
  );
};

interface LoggedOutPageProps {
  children?: React.ReactNode;
}

const LoggedOutPage = ({ children }: LoggedOutPageProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <main>
        <Container
          sx={{
            pt: '10rem',
            pb: '10rem',
            maxWidth: page.maxWidth,
          }}
        >
          {children}
        </Container>
      </main>
    </ThemeProvider>
  );
};

const Page = ({ children, user }: Props) => {
  if (!user) {
    return <LoggedOutPage>{children}</LoggedOutPage>;
  }

  return <LoggedInPage user={user}>{children}</LoggedInPage>;
};

export default Page;
