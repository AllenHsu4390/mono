import { AssetsResponse } from '@main/rest-models';
import { useAssets } from '../../hooks/useAssets';
import { AssetsGrid } from './grid';

interface Props {
  initialAssets: AssetsResponse;
}

export const Gallery = ({ initialAssets }: Props) => {
  const { assets, isLoading, isError, hasNextPage, fetchNextPage } = useAssets(
    initialAssets.links.next?.url
  );

  const assetPages = assets?.pages || [];
  const shouldShowSkeleton =
    isLoading || isError || !assets || assetPages.length === 0;

  const loadMore = () => {
    fetchNextPage();
  };

  return (
    <AssetsGrid
      hasNextPage={!!hasNextPage}
      shouldShowSkeleton={shouldShowSkeleton}
      loadMore={loadMore}
      assetPages={assetPages}
      initialAssets={initialAssets}
    />
  );
};
