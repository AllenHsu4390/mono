import Page from '../_base/page';
import AssetInteractable from '../../block/asset/asset';
import { AssetResponse, UserResponse } from '@main/rest-models';
import { Container } from '@mui/material';

interface Props {
  asset: AssetResponse;
  user: UserResponse;
}

export default function AssetPage({ asset, user }: Props) {
  return (
    <Page user={user} title={asset.creator.name}>
      <Container>
        <AssetInteractable asset={asset} />
      </Container>
    </Page>
  );
}
