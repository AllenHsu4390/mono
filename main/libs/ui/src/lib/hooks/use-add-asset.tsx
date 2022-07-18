import type {
  AssetsResponse,
  CreatorResponse,
  SaveAssetResultResponse,
} from '@main/rest-models';
import { useMutation } from 'react-query';
import { useAssets } from './use-assets';
import { useUser } from './use-user';

const sendToCdn = async (imageData: Blob) => {
  console.log(imageData);
  return 'some-token';
};

export const useAddAsset = ({
  creator,
  onError,
  assets,
}: {
  creator: CreatorResponse;
  assets: AssetsResponse;
  onError?(error: any): void;
}) => {
  const { refetchAssets } = useAssets(assets);
  const { user } = useUser();
  const mutation = useMutation<SaveAssetResultResponse, unknown, File>(
    async (imageData: File) => {
      if (!creator.links.newAsset) {
        throw new Error('Missing capability new-asset');
      }

      if (!imageData) {
        throw new Error('No image to upload');
      }

      const cdnToken = await sendToCdn(imageData);

      const res = await fetch(creator.links.newAsset, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify({
          cdnToken,
        }),
      });

      refetchAssets();

      return res.json();
    },
    {
      onError: (error) => {
        onError && onError(error);
      },
    }
  );

  return {
    addAsset: mutation.mutateAsync,
    isAvailable: !!user,
  };
};
