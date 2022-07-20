import {
  getTopAssetsResponse,
  PropsHandler,
  withGuestProps,
  withRedirect404OnError,
  withUserOrNullProps,
} from '@main/next-utils';
import { FeedPage, FeedPageProps } from '@main/ui';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = new PropsHandler()
  .add(withRedirect404OnError)
  .add(withUserOrNullProps)
  .add(withGuestProps)
  .engage(async () => {
    const props: FeedPageProps = {
      initialAssets: await getTopAssetsResponse('1'),
    };

    return {
      props,
    };
  });

export default FeedPage;
