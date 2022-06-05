import { GetServerSideProps, NextPage } from 'next';
import { AssetPage } from '@main/ui';
import { getAssetOrNull, getUserOrNull } from '@main/rest';
import { auth } from '@main/auth';
import { AssetResponse, UserResponse } from '@main/rest-models';

interface Props {
  user: UserResponse | null;
  asset: AssetResponse;
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { idKey } = req.cookies;
  const { assetId } = query;
  const user = await getUserOrNull(auth().identity.userId(idKey));
  const asset = await getAssetOrNull([...[assetId]].flat()[0]);
  const props: Props = {
    user,
    asset,
  };

  return {
    ...(!asset
      ? {
          redirect: {
            permanent: false,
            destination: '/404',
          },
        }
      : {}),
    props,
  };
};

const AssetNextPage: NextPage<Props> = ({ user, asset }) => {
  return <AssetPage user={user || undefined} asset={asset} />;
};

export default AssetNextPage;
