import { auth } from '@main/auth';
import { getTrend, getUser } from '@main/rest';
import { TrendResponse, UserResponse } from '@main/rest-models';
import { FeedPage } from '@main/ui';
import { NextPage } from 'next';

interface Props {
  user: UserResponse | null;
  trend: TrendResponse;
}

export async function getServerSideProps({ req }) {
  const { idKey } = req.cookies;
  const user = idKey ? await getUser(auth().identity.userId(idKey)) : null;
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
