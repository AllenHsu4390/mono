import type { SessionResponse } from '@main/rest-models';
import { useMutation } from 'react-query';
import { useGuest } from './use-guest';

export const useLogin = ({
  email,
  onError,
}: {
  email: string;
  onError?(error: any): void;
}) => {
  const { guest } = useGuest();
  const mutation = useMutation<SessionResponse>(
    async () => {
      if (!guest?.links.login) {
        throw new Error('Missing capability: login');
      }

      const response = await fetch(guest.links.login, {
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
