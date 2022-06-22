import { GetServerSideProps } from 'next';
import { UserProps, GalleryPage, GalleryPageProps } from '@main/ui';
import { getCreator, rest } from '@main/rest';
import { z } from 'zod';
import {
  PropsHandler,
  requestTo,
  withGuestProps,
  withRedirect404OnError,
} from '@main/next-utils';

export const getServerSideProps: GetServerSideProps = new PropsHandler()
  .add(withRedirect404OnError)
  .add(withGuestProps)
  .engage(async ({ req, query }) => {
    const { creatorId } = z
      .object({
        creatorId: z.string(),
      })
      .parse(query);
    const user = await requestTo.userOrNull(req);
    const creator = await getCreator(creatorId, user);
    const assets = await rest.assets.byCreator(creator.id, '1');
    const props: GalleryPageProps & UserProps = {
      user,
      creator,
      initialAssets: assets,
    };

    return {
      props,
    };
  });

export default GalleryPage;
