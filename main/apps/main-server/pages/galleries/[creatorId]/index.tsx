import { NextPage } from 'next';
import { GalleryPage } from '@main/ui';
import { getCreator, getUser } from '@main/rest';
import { auth } from '@main/auth';
import { CreatorResponse, UserResponse } from '@main/rest-models';

interface Props {
  user: UserResponse | null;
  creator: CreatorResponse;
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
