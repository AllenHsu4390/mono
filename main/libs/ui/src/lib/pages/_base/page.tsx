import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navigation from '../../block/navigation';
import CompanyContact from './company-contact';
import { Container } from '@mui/material';
import { User } from '@main/models';
import { UserResponse } from '@main/rest';

const theme = createTheme({
  palette: {
    secondary: {
      light: '#fff',
      main: '#f5f5f5',
      contrastText: '#000000',
    },
    primary: {
      light: '#fff',
      main: '#222',
      contrastText: '#fff',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
});

theme.typography.h3 = {
  fontSize: '1.2rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

interface Props {
  hasFooter?: boolean;
  hasNavigation?: boolean;
  user?: User & UserResponse;
}

const Page: React.FC<Props> = ({
  hasFooter,
  children,
  hasNavigation,
  user,
}) => {
  return (
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
  );
};

export default Page;
