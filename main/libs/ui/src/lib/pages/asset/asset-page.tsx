import Page from '../_base/page';
import AssetInteractable from '../../block/asset/asset';
import type { AssetResponse } from '@main/rest-models';
import { Container, Stack, Switch, Typography } from '@mui/material';
import DeleteAssetButton from '../../element/delete-asset-button';
import { VisibilityButton } from '../../element/visibility-button';

export interface AssetPageProps {
  asset: AssetResponse;
}

export const AssetPage = ({ asset }: AssetPageProps) => {
  return (
    <Page
      title={asset.creator.name}
      actionsBar={
        asset.links.delete ? (
          <Stack
            direction="row-reverse"
            spacing={'1rem'}
            sx={{
              pr: '1rem',
            }}
          >
            {asset.links.delete ? <DeleteAssetButton asset={asset} /> : null}
            {asset.links.delete ? <VisibilityButton asset={asset} /> : null}
          </Stack>
        ) : null
      }
    >
      <Container>
        <AssetInteractable asset={asset} />
      </Container>
    </Page>
  );
};
