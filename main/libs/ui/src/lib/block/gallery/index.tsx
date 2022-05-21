import { CreatorResponse } from '@main/rest-models';
import { useAssets } from '../../hooks/assets';
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
