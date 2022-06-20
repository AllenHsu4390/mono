import { useMutation } from 'react-query';
import { useRouter } from './use-router';
import { useUser } from './use-user';

export const useLogout = () => {
  const { user } = useUser();
  const router = useRouter();

  const mutation = useMutation(
    async () => {
      await fetch('/api/users/logout', {
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
