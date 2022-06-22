import { PropsHandler, withRedirect404OnError } from '@main/next-utils';
import { AuthPage, AuthPageProps } from '@main/ui';
import { GetServerSideProps } from 'next';
import { z } from 'zod';

export const getServerSideProps: GetServerSideProps = new PropsHandler()
  .add(withRedirect404OnError)
  .engage(async ({ query }) => {
    const { sessionKey } = z
      .object({
        sessionKey: z.string(),
      })
      .parse(query);

    const props: AuthPageProps = {
      confirmLoginUrl: `/api/sessions?sessionKey=${sessionKey}`,
    };

    return {
      props,
    };
  });

export default AuthPage;
