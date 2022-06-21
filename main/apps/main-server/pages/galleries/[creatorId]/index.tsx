import { GetServerSideProps } from 'next';
import {
  WithUserProps,
  GalleryPage,
  GalleryPageProps,
  WithGuestProps,
} from '@main/ui';
import { getCreator, rest } from '@main/rest';
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
    const assets = await rest.assets.byCreator(creator.id, '1');
    const guest = rest.guests.start();
    const props: GalleryPageProps & WithUserProps & WithGuestProps = {
      user,
      creator,
      guest,
      initialAssets: assets,
    };

    return {
      props,
    };
  }
);

export default GalleryPage;
