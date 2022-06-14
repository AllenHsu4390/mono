import { GetServerSideProps, NextPage } from 'next';
import { GalleryPage } from '@main/ui';
import { getAssets, getCreator } from '@main/rest';
import {
  AssetsResponse,
  CreatorResponse,
  UserResponse,
} from '@main/rest-models';
import { z } from 'zod';
import { requestTo, withRedirect404OnError } from '@main/next-utils';

interface Props {
  user: UserResponse | null;
  creator: CreatorResponse;
  assets: AssetsResponse | null;
}

export const getServerSideProps: GetServerSideProps = withRedirect404OnError(
  async ({ req, query }) => {
    const { creatorId } = z
      .object({
        creatorId: z.string(),
      })
      .parse(query);
    const user = await requestTo.userOrNull(req);
    const creator = await getCreator(creatorId, user);
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
