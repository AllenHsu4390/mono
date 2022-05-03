import { NextPage } from 'next';
import { GalleryPage } from '@main/ui';
import { Creator, User } from '@main/models';
import { CreatorResponse, getCreator, getUser, UserResponse } from '@main/rest';
import { auth } from '@main/auth';

interface Props {
  user: (User & UserResponse) | null;
  creator: Creator & CreatorResponse;
}

export async function getServerSideProps({ params, req }) {
  const { idKey } = req.cookies;
  const { creatorId } = params;
  if (typeof creatorId !== 'string') {
    throw {
      message: 'Something went wrong',
    };
  }
  const user = idKey ? await getUser(auth().identity.userId(idKey)) : null;
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
  return <GalleryPage user={user || undefined} creator={creator} />;
};

export default Gallery;
