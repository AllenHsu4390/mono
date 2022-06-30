import CssBaseline from '@mui/material/CssBaseline';
import Navigation from '../../block/navigation';
import { Box, Container, Paper } from '@mui/material';
import { page } from '../../providers/theme';
import Head from '../../element/head';

interface Props {
  title?: string;
  children?: React.ReactNode;
  actionsBar?: React.ReactNode;
}

const Page = ({ children, title, actionsBar }: Props) => {
  return (
    <>
      <CssBaseline />
      <Navigation />
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        {actionsBar ? (
          <Paper
            sx={{
              borderRadius: 0,
              width: '100%',
              pb: '1rem',
              pt: '1rem',
              position: 'fixed',
              zIndex: 2,
              top: '6rem',
            }}
          >
            <Container
              sx={{
                maxWidth: page.maxWidth,
              }}
            >
              {actionsBar}
            </Container>
          </Paper>
        ) : null}
        <Container
          sx={{
            pt: actionsBar ? '6rem' : '10rem',
            pb: '10rem',
            maxWidth: page.maxWidth,
          }}
        >
          {actionsBar ? (
            <Box sx={{ width: '100%', pt: '6rem' }}>{children}</Box>
          ) : (
            children
          )}
        </Container>
      </main>
    </>
  );
};

export default Page;
