import {
  PropsHandler,
  withGuestProps,
  withRedirect404OnError,
  withUserOrNullProps,
} from '@main/next-utils';
import { rest } from '@main/rest';
import { FeedPage, FeedPageProps } from '@main/ui';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = new PropsHandler()
  .add(withRedirect404OnError)
  .add(withUserOrNullProps)
  .add(withGuestProps)
  .engage(async () => {
    const props: FeedPageProps = {
      initialAssets: await rest.assets.top.get({
        pageId: '1',
      }),
    };

    return {
      props,
    };
  });

export default FeedPage;
