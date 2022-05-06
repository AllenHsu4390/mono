import { NextPage } from 'next';
import { NewGalleryPage } from '@main/ui';
import { auth } from '@main/auth';
import { getUser } from '@main/rest';
import { UserResponse } from '@main/rest-models';

interface Props {
  user: UserResponse;
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

const NewGalleryNextPage: NextPage<Props> = ({ user }) => {
  return <NewGalleryPage user={user} />;
};

export default NewGalleryNextPage;
