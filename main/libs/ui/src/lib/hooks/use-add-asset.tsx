import type { CreatorResponse } from '@main/rest-models';
import { useMutation } from 'react-query';
import { useUser } from './use-user';

export const useAddAsset = ({
  creator,
  onError,
}: {
  creator: CreatorResponse;
  onError?(error: any): void;
}) => {
  const { user } = useUser();
  const mutation = useMutation<{ ok: true }>(
    async () => {
      if (!creator.links.newAsset) {
        throw new Error('missing capability new-asset');
      }
      const res = await fetch(creator.links.newAsset, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          imageData: 'some-sort-of-big-byte-string-later',
        }),
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
    addAsset: mutation.mutateAsync,
    isAvailable: !!user,
  };
};
