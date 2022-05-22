import { AssetsResponse, UserResponse } from '@main/rest-models';
import { Gallery } from '../../block/gallery';
import { useScrollReset } from '../../hooks/useScrollReset';
import Page from '../_base/page';

interface Props {
  user: UserResponse;
  initialAssets: AssetsResponse;
}

export default function FeedPage({ user, initialAssets }: Props) {
  useScrollReset('feed');
  return (
    <Page user={user}>
      <Gallery initialAssets={initialAssets} />
    </Page>
  );
}
