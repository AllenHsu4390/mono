import { NextPage } from 'next';
import { NewAlbumPage } from '@main/ui';
import { User } from '@main/models';
import { auth } from '@main/auth';
import { getUser, UserResponse } from '@main/rest';

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

const NewAlbumNextPage: NextPage<Props> = ({ user }) => {
  return <NewAlbumPage user={user} />;
};

export default NewAlbumNextPage;
