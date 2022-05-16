import { AssetResponse, Cost } from '@main/rest-models';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import { Typography, Button, IconButton, useTheme, Theme } from '@mui/material';
import AlertDialog from '../../block/alert';
import { useBalance } from '../../hooks/useBalance';
import { useConfirmDialog } from '../../hooks/confirm-dialog';
import { useDrop } from '../../hooks/drop';
import { useLikeCount, useSendLike } from '../../hooks/like';

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

const LikeButton = ({ asset }: Props) => {
  const theme = useTheme();
  const [_, setDrop] = useDrop();
  const { balance, refetchBalance } = useBalance();
  const { sendLike, isAvailable: isLikeAvailable } = useSendLike({
    asset,
  });
  const { refetchLikes } = useLikeCount({
    asset,
  });

  const dialog = useConfirmDialog();

  if (!isLikeAvailable) return null;

  const { state } = dialog;

  const confirm = async () => {
    dialog.confirm();
    const res = await sendLike();
    await refetchLikes();
    await refetchBalance();
    if (res.isDropped) {
      setDrop(res);
    }
    dialog.close();
  };

  const dialogOptions =
    balance && balance.sum >= Cost.Like
      ? {
          title: 'Are you sure?',
          content: (
            <Typography>
              {`This will use ${Cost.Like} SNP from your account`}
            </Typography>
          ),
          actions: (
            <>
              <Button onClick={dialog.close}>
                {state.isConfirmed ? 'Close' : 'Cancel'}
              </Button>
              <Button
                variant="contained"
                disabled={state.isLocked}
                onClick={confirm}
              >
                {state.isConfirmed ? 'Sending...' : 'Agree'}
              </Button>
            </>
          ),
        }
      : {
          title: 'Insufficient balance',
          content: <Typography>{`Not enough SNP in your account`}</Typography>,
          actions: (
            <Button onClick={dialog.close}>
              {state.isConfirmed ? 'Close' : 'Cancel'}
            </Button>
          ),
        };

  return (
    <AlertDialog
      open={state.isOpen}
      onClose={dialog.close}
      {...dialogOptions}
      trigger={
        <IconButton onClick={dialog.open} sx={iconButtonSx(theme)}>
          <FavoriteBorderOutlined
            sx={{
              fontSize: '2rem',
            }}
          />
        </IconButton>
      }
    />
  );
};

export default LikeButton;
