import { AssetResponse, DropResponse } from '@main/rest-models';
import { useMutation } from 'react-query';
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
