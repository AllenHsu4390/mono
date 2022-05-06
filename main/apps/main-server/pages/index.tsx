import { auth } from '@main/auth';
import { getTrend, getUser } from '@main/rest';
import { TrendResponse, UserResponse } from '@main/rest-models';
import { FeedPage } from '@main/ui';
import { NextPage } from 'next';

interface Props {
  user: UserResponse;
  trend: TrendResponse;
}

export async function getServerSideProps({ req }) {
  const { idKey } = req.cookies;
  if (!idKey) {
    throw {
      message: 'Authentication failed',
    };
  }
  const userId = auth().identity.userId(idKey);
  const user = await getUser(userId);
  const trend = await getTrend();
  const props: Props = {
    user,
    trend,
  };

  return {
    props,
  };
}

const Home: NextPage<Props> = ({ user, trend }) => {
  return <FeedPage user={user} trend={trend} />;
};

export default Home;
