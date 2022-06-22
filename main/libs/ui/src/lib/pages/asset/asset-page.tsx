import Page from '../_base/page';
import AssetInteractable from '../../block/asset/asset';
import type { AssetResponse } from '@main/rest-models';
import { Container } from '@mui/material';

export interface AssetPageProps {
  asset: AssetResponse;
}

export const AssetPage = ({ asset }: AssetPageProps) => {
  return (
    <Page title={asset.creator.name}>
      <Container>
        <AssetInteractable asset={asset} />
      </Container>
    </Page>
  );
};
