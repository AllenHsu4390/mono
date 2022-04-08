import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navigation from '../navigation/navbar';
import NavigationSkeleton from '../navigation/skeleton';
import CompanyContact from './company-contact';
import { Container } from '@mui/material';
import { User } from '@main/models';
import { useQuery } from 'react-query';

const theme = createTheme({
  palette: {
    secondary: {
      light: '#fff',
      main: '#f5f5f5',
      dark: '#c2c2c2',
      contrastText: '#000000',
    },
  },
});

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

interface Props {
  hasFooter?: boolean;
  hasNavigation?: boolean;
}

const Page: React.FC<Props> = ({ hasFooter, children, hasNavigation }) => {
  const { data, status } = useQuery<User, Error>(['user'], async () => {
    const res = await fetch(`/api/users/me`, {
      credentials: 'same-origin',
      method: 'GET',
    });
    return res.json();
  });

  const shouldShowSkeleton =
    status === 'loading' || status === 'error' || !data;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {hasNavigation ? (
        shouldShowSkeleton ? (
          <NavigationSkeleton />
        ) : (
          <Navigation user={data} />
        )
      ) : null}
      <main>
        <Container
          sx={{
            paddingY: '8px',
          }}
          maxWidth="lg"
        >
          {children}
        </Container>
      </main>
      {hasFooter ? <CompanyContact /> : null}
    </ThemeProvider>
  );
};

export default Page;
