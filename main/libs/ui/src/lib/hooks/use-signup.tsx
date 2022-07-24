import type { SessionResponse } from '@main/rest-models';
import { useMutation } from 'react-query';
import { useSession } from './use-session';

export const useSignup = ({
  email,
  onError,
  onSettled,
  onMutate,
}: {
  email: string;
  onError?(error: any): void;
  onSettled?(): void;
  onMutate?(): void;
}) => {
  const [session, setSession] = useSession();
  const mutation = useMutation<SessionResponse>(
    async () => {
      if (!session?.links.signup) {
        throw new Error('Missing capability: signup');
      }

      const response = await fetch(session.links.signup, {
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
      onError,
      onSettled,
      onMutate,
      onSuccess: (data) => {
        setSession(data);
      },
    }
  );

  return {
    sendSignup: mutation.mutateAsync,
  };
};
