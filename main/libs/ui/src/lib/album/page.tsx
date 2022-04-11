import { Creator, User } from '@main/models';

import Page from '../_base/page';
import { CreatorProfile } from '../creator/profile';

import { AssetsGrid } from './grid';
import { CreatorResponse, UserResponse } from '@main/rest';

interface Props {
  creator: Creator & CreatorResponse;
  user: User & UserResponse;
}

export default function AlbumPage({ creator, user }: Props) {
  return (
    <Page hasFooter={true} hasNavigation={true} user={user}>
      <CreatorProfile creator={creator} />
      <AssetsGrid
        creator={creator}
        assetsUrl={
          creator.links.find((link) => link.rel === 'assets')?.url || '/404'
        }
      />
    </Page>
  );
}
