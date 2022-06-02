import { useMutation } from 'react-query';
import { useSession } from './use-session';

export const useLogin = ({
  email,
  onError,
}: {
  email: string;
  onError?(error: any): void;
}) => {
  const { session } = useSession();
  const mutation = useMutation(
    async () => {
      if (!session || !session.links.login) {
        throw new Error('Missing capability login');
      }

      const response = await fetch(session.links.login.url, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify({
          email,
        }),
      });

      const loginResponse = await response.json();
      if (loginResponse.status > 400) {
        throw new Error('Wrong email');
      }
      return loginResponse;
    },
    {
      onError: (error) => {
        onError && onError(error);
      },
    }
  );

  return {
    sendLogin: mutation.mutateAsync,
  };
};
