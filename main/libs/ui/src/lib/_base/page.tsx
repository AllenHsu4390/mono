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
    background: {
      default: '#fff',
      paper: '#fff',
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
  userUrl: string;
}

interface UserResponse {
  links: {
    rel: 'new-album' | 'logout' | 'login' | 'edit-account';
    url: string;
  }[];
}

const Page: React.FC<Props> = ({
  hasFooter,
  children,
  hasNavigation,
  userUrl,
}) => {
  const { data, isError, isLoading, error } = useQuery<
    User & UserResponse,
    Error & UserResponse
  >(
    ['user'],
    async () => {
      const res = await fetch(userUrl);

      if (res.status >= 400) {
        throw await res.json();
      }

      return await res.json();
    },
    {
      retry: 0,
    }
  );

  const shouldShowSkeleton = isLoading || isError || !data || error;

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
