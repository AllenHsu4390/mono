import { GetServerSideProps, NextPage } from 'next';
import { GalleryPage } from '@main/ui';
import { getAssets, getCreator, getUserOrNull } from '@main/rest';
import { auth } from '@main/auth';
import {
  AssetsResponse,
  CreatorResponse,
  UserResponse,
} from '@main/rest-models';
import { z } from 'zod';
import { withRedirect404OnError } from '@main/next-utils';

interface Props {
  user: UserResponse | null;
  creator: CreatorResponse;
  assets: AssetsResponse | null;
}

export const getServerSideProps: GetServerSideProps = withRedirect404OnError(
  async ({ req, query }) => {
    const { idKey } = z
      .object({
        idKey: z.string().optional(),
      })
      .parse(req.cookies);
    const { creatorId } = z
      .object({
        creatorId: z.string(),
      })
      .parse(query);
    const userId = idKey ? auth().identity.userId(idKey) : null;
    const user = userId ? await getUserOrNull(userId) : null;
    const creator = await getCreator(creatorId);
    const assets = await getAssets(creator.id, '1');
    const props: Props = {
      user,
      creator,
      assets,
    };

    return {
      props,
    };
  }
);

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
