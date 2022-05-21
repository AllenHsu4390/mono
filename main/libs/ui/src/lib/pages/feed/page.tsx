import { TrendResponse, UserResponse } from '@main/rest-models';
import { TopGallery } from '../../block/gallery/top-gallery';
import Page from '../_base/page';

interface Props {
  user: UserResponse;
  trend: TrendResponse;
}

export default function FeedPage({ user, trend }: Props) {
  return (
    <Page user={user}>
      <TopGallery trend={trend} />
    </Page>
  );
}
