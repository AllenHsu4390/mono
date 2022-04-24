import { NextPage } from 'next';
import { GalleryPage } from '@main/ui';
import { Creator, User } from '@main/models';
import { CreatorResponse, getCreator, getUser, UserResponse } from '@main/rest';
import { auth } from '@main/auth';

interface Props {
  user: User & UserResponse;
  creator: Creator & CreatorResponse;
}

export async function getServerSideProps({ params, req }) {
  const { idKey } = req.cookies;
  const { creatorId } = params;
  if (!idKey) {
    throw {
      message: 'Authentication failed',
    };
  }
  if (typeof creatorId !== 'string') {
    throw {
      message: 'Something went wrong',
    };
  }
  const userId = auth().identity.userId(idKey);
  const user = await getUser(userId);
  const creator = await getCreator(creatorId);
  const props: Props = {
    user,
    creator,
  };

  return {
    props,
  };
}

const Gallery: NextPage<Props> = ({ user, creator }) => {
  return <GalleryPage user={user} creator={creator} />;
};

export default Gallery;
