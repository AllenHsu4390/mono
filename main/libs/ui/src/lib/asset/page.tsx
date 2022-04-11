import { Container } from '@mui/material';
import { Asset, Creator, User } from '@main/models';
import Page from '../_base/page';
import { AssetCard } from './card';
import { AssetResponse, CreatorResponse, UserResponse } from '@main/rest';

interface Props {
  asset: Asset & AssetResponse;
  creator: Creator & CreatorResponse;
  user: User & UserResponse;
}

export default function AssetPage({ asset, creator, user }: Props) {
  return (
    <Page hasNavigation={true} hasFooter={true} user={user}>
      <Container
        sx={{
          pt: 16,
          pb: 10,
        }}
        maxWidth="md"
      >
        <AssetCard asset={asset} creator={creator} isFull={true} />
      </Container>
    </Page>
  );
}
