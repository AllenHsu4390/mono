import type { AssetResponse } from '@main/rest-models';
import { DeleteForeverOutlined } from '@mui/icons-material';
import { Typography, Button, IconButton, useTheme, Theme } from '@mui/material';
import AlertDialog from '../../block/alert';
import { useConfirmDialog } from '../../hooks/use-confirm-dialog';
import { useDeleteAsset } from '../../hooks/use-delete-asset';
import { useCreator } from '../../hooks/use-creator';
import { useRouter } from '../../hooks/use-router';

const iconButtonSx = (theme: Theme) => ({
  borderRadius: '0',
  transition: 'color 0.5s ease',
  color: theme.palette.primary.main,
  ':hover': {
    color: theme.palette.error.main,
    background: 'initial',
  },
  width: '3.2rem',
  height: '3.5rem',
});

interface Props {
  asset: AssetResponse;
}

const DeleteAssetButton = ({ asset }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const { creator } = useCreator();
  const { deleteAsset } = useDeleteAsset({ asset });
  const dialog = useConfirmDialog();

  const { state: dialogState } = dialog;

  if (!creator) {
    return null;
  }

  const confirm = async () => {
    dialog.confirm();
    await deleteAsset();
    dialog.close();
    console.log(creator);
    router.push(creator.links.gallery);
  };

  const dialogOptions = {
    title: 'Are you sure?',
    content: (
      <Typography>
        {`This will delete this asset from your gallery.`}
      </Typography>
    ),
    actions: (
      <>
        <Button onClick={dialog.close}>
          {dialogState.isConfirmed ? 'Close' : 'Cancel'}
        </Button>
        <Button
          variant="contained"
          disabled={dialogState.isLocked}
          onClick={confirm}
        >
          {dialogState.isConfirmed ? 'Deleting...' : 'Delete'}
        </Button>
      </>
    ),
  };

  return (
    <AlertDialog
      open={dialogState.isOpen}
      onClose={dialog.close}
      {...dialogOptions}
      trigger={
        <IconButton onClick={dialog.open} sx={iconButtonSx(theme)}>
          <DeleteForeverOutlined
            sx={{
              fontSize: '2rem',
            }}
          />
        </IconButton>
      }
    />
  );
};

export default DeleteAssetButton;
