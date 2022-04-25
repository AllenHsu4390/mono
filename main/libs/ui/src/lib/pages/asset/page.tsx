import { Asset, User } from '@main/models';
import Page from '../_base/page';
import AssetInteractable from '../../block/asset/asset';
import { AssetResponse, UserResponse } from '@main/rest';

interface Props {
  asset: Asset & AssetResponse;
  user: User & UserResponse;
}

export default function AssetPage({ asset, user }: Props) {
  return (
    <Page hasNavigation={true} hasFooter={true} user={user}>
      <AssetInteractable asset={asset} />
    </Page>
  );
}
