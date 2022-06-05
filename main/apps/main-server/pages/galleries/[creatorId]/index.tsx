import { GetServerSideProps, NextPage } from 'next';
import { GalleryPage } from '@main/ui';
import { getAssets, getCreatorOrNull, getUserOrNull } from '@main/rest';
import { auth } from '@main/auth';
import {
  AssetsResponse,
  CreatorResponse,
  UserResponse,
} from '@main/rest-models';

interface Props {
  user: UserResponse | null;
  creator: CreatorResponse;
  assets: AssetsResponse | null;
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { idKey } = req.cookies;
  const { creatorId } = query;
  const user = await getUserOrNull(auth().identity.userId(idKey));
  const creator = await getCreatorOrNull([...[creatorId]].flat()[0]);
  const assets = creator ? await getAssets(creator.id, '1') : null;
  const props: Props = {
    user,
    creator,
    assets,
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
};

const Gallery: NextPage<Props> = ({ user, creator, assets }) => {
  return (
    <GalleryPage
      user={user || undefined}
      creator={creator}
      initialAssets={assets}
    />
  );
};

export default Gallery;
