import { NextPage } from 'next';
import { AssetPage } from '@main/ui';
import { Asset, Creator, User } from '@main/models';
import { AssetResponse, getAsset, getUser, UserResponse } from '@main/rest';
import { auth } from '@main/auth';

interface Props {
  user: (User & UserResponse) | null;
  asset: Asset & AssetResponse;
}

export async function getServerSideProps({ params, req }) {
  const { idKey } = req.cookies;
  const { assetId } = params;
  if (typeof assetId !== 'string') {
    throw {
      message: 'Something went wrong',
    };
  }
  const asset = await getAsset(assetId);
  const user = idKey ? await getUser(auth().identity.userId(idKey)) : null;
  const props: Props = {
    user,
    asset,
  };

  return {
    props,
  };
}
const AssetNextPage: NextPage<Props> = ({ user, asset }) => {
  return <AssetPage user={user || undefined} asset={asset} />;
};

export default AssetNextPage;
