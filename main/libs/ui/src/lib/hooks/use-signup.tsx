import type { SessionResponse } from '@main/rest-models';
import { useMutation } from 'react-query';

export const useSignup = ({
  email,
  session,
  onError,
  onSettled,
  onMutate,
}: {
  email: string;
  session?: SessionResponse;
  onError?(error: any): void;
  onSettled?(): void;
  onMutate?(): void;
}) => {
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
    }
  );

  return {
    sendSignup: mutation.mutateAsync,
  };
};
