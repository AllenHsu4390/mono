import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Page from '../_base/page';

export interface AuthPageProps {
  confirmLoginUrl: string;
}

export const AuthPage = ({ confirmLoginUrl }: AuthPageProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const mutation = useMutation<{ ok: true }>(
    async () => {
      const res = await fetch(confirmLoginUrl, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        method: 'POST',
      });

      return res.json();
    },
    {
      onSuccess: ({ ok }) => {
        if (ok) {
          setAuthenticated(true);
        }
      },
    }
  );

  const sendAuth = mutation.mutateAsync;

  useEffect(() => {
    sendAuth();
  }, [sendAuth]);

  return (
    <Page>
      {authenticated ? (
        <>Authenticated. Check back on the original device.</>
      ) : (
        <>Authenticating...</>
      )}
    </Page>
  );
};
