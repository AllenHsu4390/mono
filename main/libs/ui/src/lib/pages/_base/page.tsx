import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Navigation from '../../block/navigation';
import { Container } from '@mui/material';
import { UserResponse } from '@main/rest-models';
import { BalanceProvider } from '../../hooks/use-balance';
import { page, theme } from '../../providers/theme';
import { DropProvider } from '../../hooks/use-drop';
import { UserProvider } from '../../hooks/use-user';
import Head from '../../element/head';
import { companyName } from '../../element/company/wordmark';
import { SessionProvider } from '../../hooks/use-session';

interface Props {
  title?: string;
  user?: UserResponse;
  children?: React.ReactNode;
}

interface LoggedOutPageProps {
  title: string;
  children?: React.ReactNode;
}

type LoggedInPageProps = LoggedOutPageProps & {
  user: UserResponse;
};

const LoggedInPage = ({ title, user, children }: LoggedInPageProps) => {
  return (
    <SessionProvider>
      <UserProvider user={user}>
        <DropProvider>
          <BalanceProvider user={user}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Navigation user={user} />
              <Head>
                <title>{title}</title>
              </Head>
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
    </SessionProvider>
  );
};

const LoggedOutPage = ({ title, children }: LoggedOutPageProps) => {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
        <Head>
          <title>{title}</title>
        </Head>
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
    </SessionProvider>
  );
};

const Page = ({ children, user, title }: Props) => {
  if (!user) {
    return (
      <LoggedOutPage title={title || companyName}>{children}</LoggedOutPage>
    );
  }

  return (
    <LoggedInPage title={title || companyName} user={user}>
      {children}
    </LoggedInPage>
  );
};

export default Page;
