import type { SessionResponse } from '@main/rest-models';
import { useMutation } from 'react-query';
import { useGuest } from './use-guest';
import { useSession } from './use-session';

export const useLogin = ({
  email,
  onError,
  onMutate,
  onSettled,
}: {
  email: string;
  onError?(error: any): void;
  onMutate?(error: any): void;
  onSettled?(): void;
}) => {
  const [, setSession] = useSession();
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
        throw new Error(loginResponse.message);
      }
      return loginResponse;
    },
    {
      onError,
      onMutate,
      onSettled,
      onSuccess: (data) => {
        setSession(data);
      },
    }
  );

  return {
    sendLogin: mutation.mutateAsync,
  };
};
