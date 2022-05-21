import { NextPage } from 'next';
import { GalleryPage } from '@main/ui';
import { getCreatorOrNull, getUserOrNull } from '@main/rest';
import { auth } from '@main/auth';
import { CreatorResponse, UserResponse } from '@main/rest-models';

interface Props {
  user: UserResponse | null;
  creator: CreatorResponse;
}

export async function getServerSideProps({ params, req }) {
  const { idKey } = req.cookies;
  const { creatorId } = params;
  const user = await getUserOrNull(auth().identity.userId(idKey));
  const creator = await getCreatorOrNull(creatorId);
  const props: Props = {
    user,
    creator,
  };

  return {
    ...(!creator
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

const Gallery: NextPage<Props> = ({ user, creator }) => {
  return <GalleryPage user={user || undefined} creator={creator} />;
};

export default Gallery;
