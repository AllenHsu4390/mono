import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navigation from './navigation';
import CompanyContact from './company-contact';
import { Container } from '@mui/material';
import { Users } from '@main/models';
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

interface Props {
  hasFooter?: boolean;
}

const Page: React.FC<Props> = ({ hasFooter, children }) => {
  const { data, status } = useQuery<Users, Error>(['users'], async () => {
    const res = await fetch(`/api/users`);
    return res.json();
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error' || !data) {
    return <div>Error</div>;
  }

  console.log(data);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation user={data.users[0]} />
      <main>
        <Container
          sx={{
            paddingY: '8px',
          }}
          maxWidth="md"
        >
          {children}
        </Container>
      </main>
      {hasFooter ? <CompanyContact /> : null}
    </ThemeProvider>
  );
};

export default Page;
