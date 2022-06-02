import { NextPage } from 'next';
import { NewGalleryPage } from '@main/ui';
import { auth } from '@main/auth';
import { getUser, getUserOrNull } from '@main/rest';
import { UserResponse } from '@main/rest-models';

interface Props {
  user: UserResponse;
}

export async function getServerSideProps({ req }) {
  const { idKey } = req.cookies;
  const userId = auth().identity.userId(idKey);
  const user = await getUserOrNull(userId);
  const props: Props = {
    user,
  };

  return {
    ...(!user
      ? {
          redirect: {
            permanent: false,
            destination: '/404',
          },
        }
      : {}),
    props,
  };
}

const NewGalleryNextPage: NextPage<Props> = ({ user }) => {
  return <NewGalleryPage user={user} />;
};

export default NewGalleryNextPage;
