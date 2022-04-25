import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import LoginForm from '../../block/login-form';
import { theme } from '../../providers/theme';
import CompanyContact from '../_base/company-contact';

interface Props {
  loginUrl: string;
}

export default function LoginPage({ loginUrl }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
          <LoginForm loginUrl={loginUrl} />
        </Container>
      </main>
      <CompanyContact />
    </ThemeProvider>
  );
}
