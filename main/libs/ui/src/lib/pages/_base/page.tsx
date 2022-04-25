import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Navigation from '../../block/navigation';
import CompanyContact from './company-contact';
import { Container } from '@mui/material';
import { User } from '@main/models';
import { UserResponse } from '@main/rest';
import { BalanceProvider } from '../../providers/balance';
import { theme } from '../../providers/theme';

interface Props {
  hasFooter?: boolean;
  hasNavigation?: boolean;
  user: User & UserResponse;
}

const Page: React.FC<Props> = ({
  hasFooter,
  children,
  hasNavigation,
  user,
}) => {
  return (
    <BalanceProvider user={user}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {hasNavigation && user ? <Navigation user={user} /> : null}
        <main>
          <Container
            sx={{
              paddingY: '0.5rem',
              maxWidth: theme.breakpoints.values.lg,
              [theme.breakpoints.down('sm')]: {
                maxWidth: '100%',
                paddingX: 0,
              },
            }}
          >
            {children}
          </Container>
        </main>
        {hasFooter ? <CompanyContact /> : null}
      </ThemeProvider>
    </BalanceProvider>
  );
};

export default Page;
