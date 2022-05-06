import { CreatorResponse, TrendResponse } from '@main/rest-models';
import { useAssets, useTopAssets } from '../../hooks/assets';
import { AssetsGrid } from './grid';

interface Props {
  creator: CreatorResponse;
}

export const Gallery = ({ creator }: Props) => {
  const { assets, isLoading, isError, hasNextPage, fetchNextPage } =
    useAssets(creator);

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
    />
  );
};

export const TopGallery = ({ trend }: { trend: TrendResponse }) => {
  const { assets, isLoading, isError, hasNextPage, fetchNextPage } =
    useTopAssets(trend);

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
    />
  );
};
