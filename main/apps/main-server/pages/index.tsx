import { auth } from '@main/auth';
import { Follows, User } from '@main/models';
import { FollowsResponse, getFollows, getUser, UserResponse } from '@main/rest';
import { FeedPage } from '@main/ui';
import { NextPage } from 'next';

interface Props {
  user: User & UserResponse;
  follows: Follows & FollowsResponse;
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
  const follows = await getFollows(userId, '1');
  const props: Props = {
    user,
    follows,
  };

  return {
    props,
  };
}

const Home: NextPage<Props> = ({ user, follows }) => {
  return <FeedPage user={user} follows={follows} />;
};

export default Home;
