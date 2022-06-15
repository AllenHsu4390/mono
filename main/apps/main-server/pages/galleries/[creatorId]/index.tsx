import { GetServerSideProps } from 'next';
import { WithUserProps, GalleryPage, GalleryPageProps } from '@main/ui';
import { getAssets, getCreator } from '@main/rest';
import { z } from 'zod';
import { requestTo, withRedirect404OnError } from '@main/next-utils';

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
    const props: GalleryPageProps & WithUserProps = {
      user,
      creator,
      initialAssets: assets,
    };

    return {
      props,
    };
  }
);

export default GalleryPage;
