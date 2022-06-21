import { AssetResponse, LikesCountResponse } from '@main/rest-models';
import { useQuery } from 'react-query';

export const useLikeCount = ({
  asset,
  onSuccess,
  refetchInterval,
}: {
  asset: AssetResponse;
  onSuccess?(likes: LikesCountResponse): void;
  refetchInterval?: number;
}) => {
  const {
    isLoading,
    isError,
    data,
    refetch: refetchLikes,
  } = useQuery<LikesCountResponse>(
    ['likes', asset.id],
    async () => {
      const res = await fetch(asset.links.likeCount);
      return res.json();
    },
    {
      refetchInterval,
      onSuccess,
    }
  );

  return {
    likes: data,
    refetchLikes,
    isError,
    isLoading,
  };
};
