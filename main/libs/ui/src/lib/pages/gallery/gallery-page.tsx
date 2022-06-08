import Page from '../_base/page';
import { CreatorProfile } from '../../block/creator/profile';
import { Gallery } from '../../block/gallery';
import {
  AssetsResponse,
  CreatorResponse,
  UserResponse,
} from '@main/rest-models';
import { useScrollReset } from '../../hooks/use-scroll-reset';
import { Container } from '@mui/material';

interface Props {
  creator: CreatorResponse;
  user?: UserResponse;
  initialAssets: AssetsResponse;
}

export default function GalleryPage({ creator, user, initialAssets }: Props) {
  useScrollReset(`creator-${creator.id}`);
  return (
    <Page user={user} title={creator.name}>
      <Container>
        <CreatorProfile creator={creator} />
      </Container>
      <Gallery creator={creator} initialAssets={initialAssets} user={user} />
    </Page>
  );
}
