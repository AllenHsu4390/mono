import {
  AssetResponse,
  DropResponse,
  LikesCountResponse,
} from '@main/rest-models';
import { useMutation, useQuery } from 'react-query';
import { useUser } from './useUser';

export const useSendLike = ({
  asset,
  onError,
}: {
  asset: AssetResponse;
  onError?(error: any): void;
}) => {
  const { user } = useUser();
  const mutation = useMutation<DropResponse>(
    async () => {
      const likeUrl = asset.links.like.url;
      if (!likeUrl) {
        throw new Error('missing like capability');
      }
      const res = await fetch(likeUrl, {
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
    isAvailable: !!user,
  };
};

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
