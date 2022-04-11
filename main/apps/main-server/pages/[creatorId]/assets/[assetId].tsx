import { NextPage } from 'next';
import { AssetPage } from '@main/ui';
import { Asset, Creator, User } from '@main/models';
import {
  AssetResponse,
  CreatorResponse,
  getAsset,
  getCreator,
  getUser,
  UserResponse,
} from '@main/rest';
import { auth } from '@main/auth';

interface Props {
  user: User & UserResponse;
  creator: Creator & CreatorResponse;
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
  const user = await getUser(userId);
  const creator = await getCreator(creatorId);
  const asset = await getAsset(assetId);
  const props: Props = {
    user,
    creator,
    asset,
  };

  return {
    props,
  };
}
const AssetNextPage: NextPage<Props> = ({ user, asset, creator }) => {
  return <AssetPage user={user} asset={asset} creator={creator} />;
};

export default AssetNextPage;
