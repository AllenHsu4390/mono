import { GetServerSideProps } from 'next';
import { UserProps, AssetPage, AssetPageProps } from '@main/ui';
import { rest } from '@main/rest';
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
    const { assetId } = z
      .object({
        assetId: z.string(),
      })
      .parse(query);

    const user = await requestTo.userOrNull(req);
    const asset = await rest.assets.byId(assetId, user);
    const props: AssetPageProps & UserProps = {
      user,
      asset,
    };

    return {
      props,
    };
  });

export default AssetPage;
