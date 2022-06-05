import { auth } from '@main/auth';
import { getTopAssets, getUserOrNull } from '@main/rest';
import { AssetsResponse, UserResponse } from '@main/rest-models';
import { FeedPage } from '@main/ui';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  user: UserResponse | null;
  assets: AssetsResponse;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { idKey } = req.cookies;
  const user = await getUserOrNull(auth().identity.userId(idKey));
  const assets = await getTopAssets('1');
  const props: Props = {
    user,
    assets,
  };

  return {
    props,
  };
};

const Home: NextPage<Props> = ({ user, assets }) => {
  return <FeedPage user={user} initialAssets={assets} />;
};

export default Home;
