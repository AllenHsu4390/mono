import CssBaseline from '@mui/material/CssBaseline';
import Navigation from '../../block/navigation';
import { Container } from '@mui/material';
import { UserResponse } from '@main/rest-models';
import { page } from '../../providers/theme';
import Head from '../../element/head';

interface Props {
  title?: string;
  user?: UserResponse;
  children?: React.ReactNode;
}

const Page = ({ children, user, title }: Props) => {
  return (
    <>
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
    </>
  );
};

export default Page;
