import { NextPage } from 'next';
import { AssetPage } from '@main/ui';
import { Asset, User } from '@main/models';
import { AssetResponse, getAsset, getUser, UserResponse } from '@main/rest';
import { auth } from '@main/auth';

interface Props {
  user: User & UserResponse;
  asset: Asset & AssetResponse;
}

export async function getServerSideProps({ params, req }) {
  const { idKey } = req.cookies;
  const { creatorId, assetId } = params;
  if (!idKey) {
    throw {
      message: 'Authentication failed',
    };
  }
  if (typeof creatorId !== 'string') {
    throw {
      message: 'Something went wrong',
    };
  }
  if (typeof assetId !== 'string') {
    throw {
      message: 'Something went wrong',
    };
  }
  const userId = auth().identity.userId(idKey);
  const asset = await getAsset(assetId);
  const user = await getUser(userId);
  const props: Props = {
    user,
    asset,
  };

  return {
    props,
  };
}
const AssetNextPage: NextPage<Props> = ({ user, asset }) => {
  return <AssetPage user={user} asset={asset} />;
};

export default AssetNextPage;
