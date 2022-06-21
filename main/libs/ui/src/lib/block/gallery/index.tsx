import { AssetsResponse, CreatorResponse } from '@main/rest-models';
import { useAssets } from '../../hooks/use-assets';
import { AssetsGrid } from './grid';

interface Props {
  creator?: CreatorResponse;
  initialAssets: AssetsResponse;
}

export const Gallery = ({ initialAssets, creator }: Props) => {
  const { assets, isLoading, isError, hasNextPage, fetchNextPage } =
    useAssets(initialAssets);

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
      creator={creator}
    />
  );
};
