import { withRedirect404OnError } from '@main/next-utils';
import { AuthPage, AuthPageProps } from '@main/ui';
import { GetServerSideProps } from 'next';
import { z } from 'zod';

export const getServerSideProps: GetServerSideProps = withRedirect404OnError(
  async ({ query }) => {
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
  }
);

export default AuthPage;
