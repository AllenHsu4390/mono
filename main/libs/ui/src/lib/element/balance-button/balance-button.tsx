import {
  Typography,
  Button,
  Badge,
  CircularProgress,
  keyframes,
} from '@mui/material';
import AlertDialog from '../../block/alert';
import { useBalance } from '../../hooks/use-balance';
import { useConfirmDialog } from '../../hooks/use-confirm-dialog';
import { useDailyTopUp } from '../../hooks/use-daily-top-up';
import { BalanceCounter } from '../balance-counter';

const pulse = keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #f5f5f5;
  }
  100 {
    background-color: #fff;
  }
`;

export const BalanceButton = () => {
  const {
    sendDailyTopUp,
    creditAmount: credit,
    isAvailable: isTopUpAvailable,
  } = useDailyTopUp({
    onError: () => console.log('mint failed'),
  });

  const {
    balance,
    refetchBalance,
    startBalanceLoading,
    stopBalanceLoading,
    isBalanceLoading,
  } = useBalance();

  const dialog = useConfirmDialog();

  const confirm = async () => {
    dialog.confirm();
    dialog.close();
    startBalanceLoading();
    await sendDailyTopUp();
    await refetchBalance();
    stopBalanceLoading();
  };

  if (!balance) {
    return <CircularProgress size={'1rem'} />;
  }

  const newBalance = balance.sum + credit;
  const dialogOptions = isTopUpAvailable
    ? {
        title: 'Daily top-up',
        content: dialog.state.isLocked ? (
          <Typography>{`Updating Balance... Please wait`}</Typography>
        ) : (
          <Typography>
            {`Daily top-up adds ${credit} SNP to your account. New Balance will be ${newBalance} SNP`}
          </Typography>
        ),
        actions: (
          <>
            <Button onClick={dialog.close}>
              {dialog.state.isConfirmed ? 'Close' : 'Cancel'}
            </Button>
            <Button
              variant="contained"
              disabled={dialog.state.isLocked}
              onClick={confirm}
            >
              {dialog.state.isConfirmed ? 'Sending...' : 'Get'}
            </Button>
          </>
        ),
      }
    : {
        title: 'Daily top-up',
        content: (
          <Typography>
            {`Already used Daily top-up. Check back tomorrow to get another.`}
          </Typography>
        ),
        actions: <Button onClick={dialog.close}>Close</Button>,
      };

  const button = (
    <Button
      onClick={dialog.open}
      sx={{
        animation: isBalanceLoading ? `${pulse} 2s infinite` : undefined,
      }}
    >
      <BalanceCounter />
    </Button>
  );

  const trigger = isTopUpAvailable ? (
    <Badge badgeContent={1} color="primary">
      {button}
    </Badge>
  ) : (
    button
  );

  return (
    <AlertDialog
      open={dialog.state.isOpen}
      onClose={dialog.close}
      {...dialogOptions}
      trigger={trigger}
    />
  );
};
