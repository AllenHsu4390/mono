import { GetServerSideProps, NextPage } from 'next';
import { AssetPage } from '@main/ui';
import { getAsset } from '@main/rest';
import { AssetResponse, UserResponse } from '@main/rest-models';
import { z } from 'zod';
import { requestTo, withRedirect404OnError } from '@main/next-utils';

interface Props {
  user: UserResponse | null;
  asset: AssetResponse;
}

export const getServerSideProps: GetServerSideProps = withRedirect404OnError(
  async ({ req, query }) => {
    const { assetId } = z
      .object({
        assetId: z.string(),
      })
      .parse(query);

    const user = await requestTo.userOrNull(req);
    const asset = await getAsset(assetId, user);
    const props: Props = {
      user,
      asset,
    };

    return {
      props,
    };
  }
);

const AssetNextPage: NextPage<Props> = ({ user, asset }) => {
  return <AssetPage user={user || undefined} asset={asset} />;
};

export default AssetNextPage;
