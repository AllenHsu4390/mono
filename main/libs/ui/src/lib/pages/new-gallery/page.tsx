import { User } from '@main/models';
import { UserResponse } from '@main/rest';
import Page from '../_base/page';

import { NewAssetsGrid } from './grid';

interface Props {
  user: User & UserResponse;
}

export default function NewGalleryPage({ user }: Props) {
  return (
    <Page hasNavigation={true} user={user}>
      <NewAssetsGrid />
    </Page>
  );
}
