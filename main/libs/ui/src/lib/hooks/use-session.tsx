import { SessionResponse } from '@main/rest-models';
import { useQuery } from 'react-query';
import { useRouter } from './use-router';

export const useSession = ({
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
      if (!session.links.session) {
        throw new Error('missing capability: session');
      }

      const response = await fetch(session.links.session.url, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        method: 'GET',
      });

      return response.json();
    },
    {
      onError: (error) => {
        onError && onError(error);
      },
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
