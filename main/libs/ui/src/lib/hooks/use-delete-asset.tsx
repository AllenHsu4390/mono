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
      if (!asset.links.delete) {
        throw new Error('Missing capability: delete');
      }
      const res = await fetch(asset.links.delete, {
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
