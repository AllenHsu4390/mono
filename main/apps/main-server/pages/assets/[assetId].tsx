import { GetServerSideProps, NextPage } from 'next';
import { AssetPage } from '@main/ui';
import { getAsset, getAssetOrNull, getUserOrNull } from '@main/rest';
import { auth } from '@main/auth';
import { AssetResponse, UserResponse } from '@main/rest-models';
import { z } from 'zod';
import { withRedirect404OnError } from '@main/next-utils';

interface Props {
  user: UserResponse | null;
  asset: AssetResponse;
}

export const getServerSideProps: GetServerSideProps = withRedirect404OnError(
  async ({ req, query }) => {
    const { idKey } = z
      .object({
        idKey: z.string().optional(),
      })
      .parse(req.cookies);
    const { assetId } = z
      .object({
        assetId: z.string(),
      })
      .parse(query);

    const userId = idKey ? auth().identity.userId(idKey) : null;
    const user = userId ? await getUserOrNull(userId) : null;
    const asset = await getAsset(assetId);
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
