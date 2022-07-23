import type { SessionResponse } from '@main/rest-models';
import { useQuery } from 'react-query';
import { useRouter } from './use-router';

export const useLoginWait = ({
  session,
  onError,
}: {
  session: SessionResponse;
  onError?(error: any): void;
}) => {
  const router = useRouter();

  useQuery<SessionResponse>(
    ['session', 'wait'],
    async () => {
      if (!session.links.wait) {
        throw new Error('Missing capability: wait');
      }

      const response = await fetch(session.links.wait, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        method: 'GET',
      });

      return response.json();
    },
    {
      onError,
      onSuccess: (data) => {
        if (data.isLoggedIn) {
          router.push('/');
        }
      },
      refetchInterval: 4000,
    }
  );

  return;
};
