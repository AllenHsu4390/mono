import type { SessionResponse } from '@main/rest-models';
import { useMutation } from 'react-query';
import { useGuest } from './use-guest';

export const useSignup = ({
  email,
  onError,
}: {
  email: string;
  onError?(error: any): void;
}) => {
  const { guest } = useGuest();
  const mutation = useMutation<SessionResponse>(
    async () => {
      if (!guest?.links.signup) {
        throw new Error('Missing capability: signup');
      }

      const response = await fetch(guest.links.signup, {
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
