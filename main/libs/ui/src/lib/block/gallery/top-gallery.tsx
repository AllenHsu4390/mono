import { TrendResponse } from '@main/rest-models';
import { useTopAssets } from '../../hooks/assets';
import { AssetsGrid } from './grid';

interface Props {
  trend: TrendResponse;
}
export const TopGallery = ({ trend }: Props) => {
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
