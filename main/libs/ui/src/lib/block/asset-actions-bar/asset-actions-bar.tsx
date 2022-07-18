import { AssetResponse } from '@main/rest-models';
import { Stack } from '@mui/material';
import DeleteAssetButton from '../../element/delete-asset-button';
import { VisibilityButton } from '../../element/visibility-button';

interface Props {
  asset: AssetResponse;
}

export const AssetActionsBar = ({ asset }: Props) => {
  return (
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
  );
};
