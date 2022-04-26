import { Asset, Drop, LikesCount } from '@main/models';
import { AssetResponse } from '@main/rest';
import { useMutation, useQuery } from 'react-query';

export const useSendLike = ({
  asset,
  onError,
}: {
  asset: Asset & AssetResponse;
  onError?(error: any): void;
}) => {
  const mutation = useMutation<Drop & Response>(
    async () => {
      const likeLink = asset.links.find((l) => l.rel === 'like');
      if (!likeLink) {
        throw new Error('missing like capability');
      }
      const res = await fetch(likeLink.url, {
        method: 'POST',
      });
      return res.json();
    },
    {
      onError: (error) => {
        onError && onError(error);
      },
    }
  );

  return {
    sendLike: mutation.mutateAsync,
  };
};

export const useLikeCount = ({ asset }: { asset: Asset & AssetResponse }) => {
  const {
    isLoading,
    isError,
    data,
    refetch: refetchLikes,
  } = useQuery<LikesCount>(
    ['likes', asset.id],
    async () => {
      const countLink = asset.links.find((l) => l.rel === 'like-count');
      if (!countLink) {
        throw new Error('missing like-count capability');
      }
      const res = await fetch(countLink.url);
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
