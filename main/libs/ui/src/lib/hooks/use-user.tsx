import type { UserResponse } from '@main/rest-models';
import { atom, useAtom } from 'jotai';
import { useQuery } from 'react-query';

export const userAtom = atom<UserResponse | undefined>(undefined);

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  const { refetch } = useQuery<UserResponse>(
    ['user'],
    async () => {
      if (!user?.links.me) {
        throw new Error('Missing capability: me');
      }

      const res = await fetch(user.links.me);
      return res.json();
    },
    {
      initialData: user,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data) => {
        setUser(data);
      },
    }
  );

  return {
    user,
    refetchUser: refetch,
  };
};
