import { AssetsResponse } from '@main/rest-models';
import { useEffect } from 'react';
import { useAssets } from '../../hooks/useAssets';
import { useScrollReset } from '../../hooks/useScrollReset';
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
