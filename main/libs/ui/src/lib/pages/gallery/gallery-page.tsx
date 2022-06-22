import Page from '../_base/page';
import { CreatorProfile } from '../../block/creator/profile';
import { Gallery } from '../../block/gallery';
import type { AssetsResponse, CreatorResponse } from '@main/rest-models';
import { useScrollReset } from '../../hooks/use-scroll-reset';
import { Container } from '@mui/material';

export interface GalleryPageProps {
  creator: CreatorResponse;
  initialAssets: AssetsResponse;
}

export const GalleryPage = ({ creator, initialAssets }: GalleryPageProps) => {
  useScrollReset(`creator-${creator.id}`);
  return (
    <Page title={creator.name}>
      <Container>
        <CreatorProfile creator={creator} />
      </Container>
      <Gallery creator={creator} initialAssets={initialAssets} />
    </Page>
  );
};
