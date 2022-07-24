import type { SessionResponse } from '@main/rest-models';
import { useQuery } from 'react-query';
import { useSession } from './use-session';

export const useLoginWait = ({
  onError,
}: { onError?(error: any): void } = {}) => {
  const [session] = useSession();
  useQuery<SessionResponse>(
    ['session', 'wait'],
    async () => {
      if (!session?.links.wait) {
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
          window.location.href = '/';
        }
      },
      refetchInterval: 4000,
    }
  );

  return;
};
