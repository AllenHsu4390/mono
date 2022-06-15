import { GetServerSideProps } from 'next';
import { WithUserProps, AssetPage, AssetPageProps } from '@main/ui';
import { getAsset } from '@main/rest';
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
    const asset = await getAsset(assetId, user);
    const props: AssetPageProps & WithUserProps = {
      user,
      asset,
    };

    return {
      props,
    };
  }
);

export default AssetPage;
