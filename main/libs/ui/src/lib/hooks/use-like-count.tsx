import { AssetResponse, LikesCountResponse } from '@main/rest-models';
import { useQuery } from 'react-query';

export const useLikeCount = ({ asset }: { asset: AssetResponse }) => {
  const {
    isLoading,
    isError,
    data,
    refetch: refetchLikes,
  } = useQuery<LikesCountResponse>(
    ['likes', asset.id],
    async () => {
      const countUrl = asset.links.likeCount.url;
      if (!countUrl) {
        throw new Error('missing like-count capability');
      }
      const res = await fetch(countUrl);
      return res.json();
    },
    {
      refetchInterval: 5000,
    }
  );

  return {
    likes: data,
    refetchLikes,
    isError,
    isLoading,
  };
};
