import { SessionResponse } from '@main/rest-models';
import { useQuery } from 'react-query';
import { useRouter } from './use-router';
import { useSession } from './use-session';

export const useAuthWait = ({
  magicLink,
  onError,
}: {
  magicLink: string;
  onError?(error: any): void;
}) => {
  const router = useRouter();
  const { session } = useSession();

  useQuery<SessionResponse>(
    [magicLink],
    async () => {
      if (!session?.links.session.url) {
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
