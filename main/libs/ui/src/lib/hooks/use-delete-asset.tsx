import { AssetResponse } from '@main/rest-models';
import { useMutation } from 'react-query';

export const useDeleteAsset = ({
  asset,
  onError,
}: {
  asset: AssetResponse;
  onError?(error: any): void;
}) => {
  const mutation = useMutation<{ ok: true }>(
    async () => {
      const deleteUrl = asset.links.delete?.url;
      if (!deleteUrl) {
        throw new Error('missing capability delete');
      }
      const res = await fetch(deleteUrl, {
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
    deleteAsset: mutation.mutateAsync,
  };
};
