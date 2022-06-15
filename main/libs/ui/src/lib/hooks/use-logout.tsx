import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useSession } from './use-session';

export const useLogout = () => {
  const { session } = useSession();
  const router = useRouter();

  const mutation = useMutation(
    async () => {
      if (!session || !session.links.logout) {
        throw new Error('Missing capability logout');
      }

      await fetch(session.links.logout.url, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify({
          isSignedIn: false,
        }),
      });

      router.push('/');
    },
    {
      onError: () => {
        router.push('/');
      },
    }
  );

  return {
    sendLogout: mutation.mutateAsync,
  };
};
