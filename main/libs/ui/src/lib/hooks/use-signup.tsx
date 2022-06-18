import { LoginResponse } from '@main/rest-models';
import { useMutation } from 'react-query';
import { useSession } from './use-session';

export const useSignup = ({
  email,
  onError,
}: {
  email: string;
  onError?(error: any): void;
}) => {
  const { session } = useSession();
  const mutation = useMutation<LoginResponse>(
    async () => {
      if (!session || !session.links.signup) {
        throw new Error('Missing capability signup');
      }

      const response = await fetch(session.links.signup.url, {
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
    sendSignup: mutation.mutateAsync,
  };
};
