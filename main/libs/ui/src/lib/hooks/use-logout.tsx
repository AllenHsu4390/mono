import { useMutation } from 'react-query';
import { useGuest } from './use-guest';
import { useRouter } from './use-router';

export const useLogout = () => {
  const { guest } = useGuest();
  const router = useRouter();

  const mutation = useMutation(
    async () => {
      if (!guest?.links.logout) {
        throw new Error('Missing capability: logout');
      }

      await fetch(guest.links.logout.url, {
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
