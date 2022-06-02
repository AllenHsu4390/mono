import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from '../../hooks/use-session';
import Page from '../_base/page';

export default function AuthPage() {
  const router = useRouter();
  const { session } = useSession();

  useEffect(() => {
    if (session?.isLoggedIn) {
      router.push('/');
    }
  }, [session?.isLoggedIn, router]);

  return <Page>Waiting...</Page>;
}
