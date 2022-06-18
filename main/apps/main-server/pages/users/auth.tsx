import { withRedirect404OnError } from '@main/next-utils';
import { AuthPage, AuthPageProps } from '@main/ui';
import { GetServerSideProps } from 'next';
import { z } from 'zod';

export const getServerSideProps: GetServerSideProps = withRedirect404OnError(
  async ({ query }) => {
    const { u, iv } = z
      .object({
        u: z.string(),
        iv: z.string(),
      })
      .parse(query);

    const props: AuthPageProps = {
      magicLink: `/api/sessions?u=${u}&iv=${iv}`,
    };

    return {
      props,
    };
  }
);

export default AuthPage;
