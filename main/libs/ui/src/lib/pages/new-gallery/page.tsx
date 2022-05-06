import { UserResponse } from '@main/rest-models';
import Page from '../_base/page';

import { NewAssetsGrid } from './grid';

interface Props {
  user: UserResponse;
}

export default function NewGalleryPage({ user }: Props) {
  return (
    <Page user={user}>
      <NewAssetsGrid />
    </Page>
  );
}
