import { requestTo, withRedirect404OnError } from '@main/next-utils';
import { rest } from '@main/rest';
import {
  WithUserProps,
  FeedPage,
  FeedPageProps,
  WithGuestProps,
} from '@main/ui';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = withRedirect404OnError(
  async ({ req }) => {
    const props: FeedPageProps & WithUserProps & WithGuestProps = {
      user: await requestTo.userOrNull(req),
      guest: rest.guests.start(),
      initialAssets: await rest.assets.top('1'),
    };

    return {
      props,
    };
  }
);

export default FeedPage;
