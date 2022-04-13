import { auth } from '@main/auth';
import { User } from '@main/models';
import { getUser, UserResponse } from '@main/rest';
import { FeedPage } from '@main/ui';
import { NextPage } from 'next';

interface Props {
  user: User & UserResponse;
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
  const props: Props = {
    user,
  };

  return {
    props,
  };
}

const Home: NextPage<Props> = ({ user }) => {
  return <FeedPage user={user} />;
};

export default Home;
