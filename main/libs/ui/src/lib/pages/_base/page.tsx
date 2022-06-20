import CssBaseline from '@mui/material/CssBaseline';
import Navigation from '../../block/navigation';
import { Container } from '@mui/material';
import { page } from '../../providers/theme';
import Head from '../../element/head';

interface Props {
  title?: string;
  children?: React.ReactNode;
}

const Page = ({ children, title }: Props) => {
  return (
    <>
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
    </>
  );
};

export default Page;
