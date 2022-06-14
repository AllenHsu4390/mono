import { requestTo, withRedirect404OnError } from '@main/next-utils';
import { getTopAssets } from '@main/rest';
import { AssetsResponse, UserResponse } from '@main/rest-models';
import { FeedPage } from '@main/ui';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  user: UserResponse | null;
  assets: AssetsResponse;
}

export const getServerSideProps: GetServerSideProps = withRedirect404OnError(
  async ({ req }) => {
    const user = await requestTo.userOrNull(req);
    const assets = await getTopAssets('1');
    const props: Props = {
      user,
      assets,
    };

    return {
      props,
    };
  }
);

const Home: NextPage<Props> = ({ user, assets }) => {
  return <FeedPage user={user} initialAssets={assets} />;
};

export default Home;
