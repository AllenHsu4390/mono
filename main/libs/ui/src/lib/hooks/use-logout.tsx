import { useMutation } from 'react-query';
import { useGuest } from './use-guest';

export const useLogout = () => {
  const { guest } = useGuest();

  const mutation = useMutation(
    async () => {
      if (!guest?.links.logout) {
        throw new Error('Missing capability: logout');
      }

      await fetch(guest.links.logout, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify({
          isSignedIn: false,
        }),
      });
    },
    {
      onSettled: () => {
        window.location.href = '/';
      },
    }
  );

  return {
    sendLogout: mutation.mutateAsync,
  };
};
