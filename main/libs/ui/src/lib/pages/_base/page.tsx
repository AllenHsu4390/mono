import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Navigation from '../../block/navigation';
import { Container } from '@mui/material';
import { User } from '@main/models';
import { UserResponse } from '@main/rest';
import { BalanceProvider } from '../../hooks/balance';
import { theme } from '../../providers/theme';
import { DropProvider } from '../../hooks/drop';

interface Props {
  hasNavigation?: boolean;
  user?: User & UserResponse;
  children?: React.ReactNode;
}

const Page = ({ children, hasNavigation, user }: Props) => {
  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation user={user} />
        <main>
          <Container
            sx={{
              pt: 16,
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
