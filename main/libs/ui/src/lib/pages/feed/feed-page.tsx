import type { AssetsResponse } from '@main/rest-models';
import { Gallery } from '../../block/gallery';
import { GalleryFilters } from '../../block/gallery-filters/gallery-filters';
import { useScrollReset } from '../../hooks/use-scroll-reset';
import Page from '../_base/page';

export interface FeedPageProps {
  initialAssets: AssetsResponse;
}

export const FeedPage = ({ initialAssets }: FeedPageProps) => {
  useScrollReset('feed');
  return (
    <Page actionsBar={<GalleryFilters />}>
      <Gallery initialAssets={initialAssets} />
    </Page>
  );
};
