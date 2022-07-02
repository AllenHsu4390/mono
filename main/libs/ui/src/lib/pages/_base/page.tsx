import CssBaseline from '@mui/material/CssBaseline';
import Navigation from '../../block/navigation';
import { Box, Container } from '@mui/material';
import { page } from '../../providers/theme';
import Head from '../../element/head';
import { ActionsBar } from '../../block/actions-bar';

interface Props {
  title?: string;
  children?: React.ReactNode;
  actionsBar?: React.ReactNode;
}

const Page = ({ children, title, actionsBar }: Props) => {
  return (
    <>
      <CssBaseline />
      <Navigation showBottomBorder={!actionsBar} />
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        {actionsBar ? <ActionsBar>{actionsBar}</ActionsBar> : null}
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
