import Page from '../_base/page';
import AssetInteractable from '../../block/asset/asset';
import type { AssetResponse } from '@main/rest-models';
import { Container } from '@mui/material';
import { AssetActionsBar } from '../../block/asset-actions-bar';

export interface AssetPageProps {
  asset: AssetResponse;
}

export const AssetPage = ({ asset }: AssetPageProps) => {
  return (
    <Page
      title={asset.creator.name}
      actionsBar={asset.links.delete ? <AssetActionsBar asset={asset} /> : null}
    >
      <Container>
        <AssetInteractable asset={asset} />
      </Container>
    </Page>
  );
};
