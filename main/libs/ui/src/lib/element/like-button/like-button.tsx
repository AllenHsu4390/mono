import type { AssetResponse } from '@main/rest-models';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import {
  Typography,
  Button,
  IconButton,
  useTheme,
  Theme,
  CircularProgress,
  keyframes,
} from '@mui/material';
import AlertDialog from '../../block/alert';
import { useBalance } from '../../hooks/use-balance';
import { useConfirmDialog } from '../../hooks/use-confirm-dialog';
import { useDrop } from '../../hooks/use-drop';
import { useSendLike } from '../../hooks/use-send-like';
import { useLikeCount } from '../../hooks/use-like-count';
import Link from '../link';

// MOVE
const Cost = {
  Like: 60,
};

const pulse = keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #f50000;
  }
  100 {
    background-color: #fff;
  }
`;

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
  const {
    balance,
    refetchBalance,
    startBalanceLoading,
    stopBalanceLoading,
    isBalanceLoading,
  } = useBalance();
  const { sendLike, isAvailable: isLikeAvailable } = useSendLike({
    asset,
  });
  const { refetchLikes } = useLikeCount({
    asset,
  });

  const dialog = useConfirmDialog();

  const { state: dialogState } = dialog;

  if (!isLikeAvailable) {
    return (
      <AlertDialog
        open={dialogState.isOpen}
        onClose={dialog.close}
        {...{
          title: 'Login required',
          content: (
            <Typography>An account is needed to like an asset</Typography>
          ),
          actions: (
            <Link to="/users/login" target="_blank">
              <Button variant="contained">Go to Login</Button>
            </Link>
          ),
        }}
        trigger={
          <IconButton onClick={dialog.open} sx={iconButtonSx(theme)}>
            <FavoriteBorderOutlined
              sx={{
                fontSize: '1.7rem',
              }}
            />
          </IconButton>
        }
      />
    );
  }

  const confirm = async () => {
    dialog.confirm();
    dialog.close();
    startBalanceLoading();
    const res = await sendLike();
    await refetchLikes();
    await refetchBalance();
    if (res.isDropped) {
      setDrop(res);
    }
    stopBalanceLoading();
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
                {dialogState.isConfirmed ? 'Close' : 'Cancel'}
              </Button>
              <Button
                variant="contained"
                disabled={dialogState.isLocked}
                onClick={confirm}
              >
                {dialogState.isConfirmed ? 'Sending...' : 'Agree'}
              </Button>
            </>
          ),
        }
      : {
          title: 'Insufficient balance',
          content: <Typography>{`Not enough SNP in your account`}</Typography>,
          actions: (
            <Button onClick={dialog.close}>
              {dialogState.isConfirmed ? 'Close' : 'Cancel'}
            </Button>
          ),
        };

  return (
    <AlertDialog
      open={dialogState.isOpen}
      onClose={dialog.close}
      {...dialogOptions}
      trigger={
        <IconButton
          disabled={isBalanceLoading}
          onClick={dialog.open}
          sx={iconButtonSx(theme)}
        >
          {isBalanceLoading ? (
            <CircularProgress size={'1rem'} />
          ) : (
            <FavoriteBorderOutlined
              sx={{
                fontSize: '2rem',
              }}
            />
          )}
        </IconButton>
      }
    />
  );
};

export default LikeButton;
