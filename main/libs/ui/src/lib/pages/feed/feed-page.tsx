import type { AssetsResponse } from '@main/rest-models';
import { Box, Paper } from '@mui/material';
import { Gallery } from '../../block/gallery';
import { GalleryFilters } from '../../block/gallery-filters/gallery-filters';
import { useScrollReset } from '../../hooks/use-scroll-reset';
import Page from '../_base/page';

export interface FeedPageProps {
  initialAssets: AssetsResponse;
}

export const FeedPage = ({ initialAssets }: FeedPageProps) => {
  useScrollReset('feed');
  return (
    <Page>
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
        <GalleryFilters />
      </Paper>
      <Box sx={{ width: '100%', pt: '6rem' }}>
        <Gallery initialAssets={initialAssets} />
      </Box>
    </Page>
  );
};
