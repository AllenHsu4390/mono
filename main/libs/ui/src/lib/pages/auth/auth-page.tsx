import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Page from '../_base/page';

export interface AuthPageProps {
  magicLink: string;
}

export const AuthPage = ({ magicLink }: AuthPageProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const mutation = useMutation<{ ok: true }>(async () => {
    const res = await fetch(magicLink, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      method: 'POST',
    });

    return res.json();
  });

  useEffect(() => {
    const sendAuth = async () => {
      const res = await mutation.mutateAsync();
      if (res.ok) {
        setAuthenticated(true);
      }
    };
    sendAuth();
  }, [mutation]);

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
