import type { CreatorResponse } from '@main/rest-models';
import { useQuery } from 'react-query';
import { useUser } from './use-user';

export const useCreator = () => {
  const { user } = useUser();
  const { data: creator, refetch } = useQuery<CreatorResponse>(
    ['creator', user?.creatorId],
    async () => {
      if (!user?.links.creator) {
        throw new Error('Missing capability: creator');
      }

      const res = await fetch(user?.links.creator);
      return res.json();
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    creator,
    refetchCreator: refetch,
  };
};
