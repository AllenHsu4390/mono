import Page from '../_base/page';
import { CreatorProfile } from '../../block/creator/profile';
import { Gallery } from '../../block/gallery';
import { CreatorResponse, UserResponse } from '@main/rest-models';

interface Props {
  creator: CreatorResponse;
  user?: UserResponse;
}

export default function GalleryPage({ creator, user }: Props) {
  return (
    <Page user={user}>
      <CreatorProfile creator={creator} />
      <Gallery creator={creator} />
    </Page>
  );
}
