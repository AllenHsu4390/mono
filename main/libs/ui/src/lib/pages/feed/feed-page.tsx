import { AssetsResponse } from '@main/rest-models';
import { Gallery } from '../../block/gallery';
import { useScrollReset } from '../../hooks/use-scroll-reset';
import Page from '../_base/page';

export interface FeedPageProps {
  initialAssets: AssetsResponse;
}

export const FeedPage = ({ initialAssets }: FeedPageProps) => {
  useScrollReset('feed');
  return (
    <Page>
      <Gallery initialAssets={initialAssets} />
    </Page>
  );
};
