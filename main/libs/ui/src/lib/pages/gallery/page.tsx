import { Creator, User } from '@main/models';

import Page from '../_base/page';
import { CreatorProfile } from '../../block/creator/profile';
import { AssetsGrid } from '../../block/gallery';
import { CreatorResponse, UserResponse } from '@main/rest';

interface Props {
  creator: Creator & CreatorResponse;
  user?: User & UserResponse;
}

export default function GalleryPage({ creator, user }: Props) {
  return (
    <Page hasNavigation={true} user={user}>
      <CreatorProfile creator={creator} />
      <AssetsGrid creator={creator} />
    </Page>
  );
}
