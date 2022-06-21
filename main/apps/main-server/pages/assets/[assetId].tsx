import { GetServerSideProps } from 'next';
import {
  WithUserProps,
  AssetPage,
  AssetPageProps,
  WithGuestProps,
} from '@main/ui';
import { rest } from '@main/rest';
import { z } from 'zod';
import { requestTo, withRedirect404OnError } from '@main/next-utils';

export const getServerSideProps: GetServerSideProps = withRedirect404OnError(
  async ({ req, query }) => {
    const { assetId } = z
      .object({
        assetId: z.string(),
      })
      .parse(query);

    const user = await requestTo.userOrNull(req);
    const asset = await rest.assets.byId(assetId, user);
    const guest = rest.guests.start();
    const props: AssetPageProps & WithUserProps & WithGuestProps = {
      user,
      asset,
      guest,
    };

    return {
      props,
    };
  }
);

export default AssetPage;
