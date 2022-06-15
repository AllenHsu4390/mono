import { requestTo, withRedirect404OnError } from '@main/next-utils';
import { getTopAssets } from '@main/rest';
import { WithUserProps, FeedPage, FeedPageProps } from '@main/ui';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = withRedirect404OnError(
  async ({ req }) => {
    const props: FeedPageProps & WithUserProps = {
      user: await requestTo.userOrNull(req),
      initialAssets: await getTopAssets('1'),
    };

    return {
      props,
    };
  }
);

export default FeedPage;
