import { UserResponse } from '@main/rest-models';
import { Typography, Button, Badge } from '@mui/material';
import AlertDialog from '../../block/alert';
import { useBalance } from '../../hooks/useBalance';
import { useConfirmDialog } from '../../hooks/confirm-dialog';
import { useDailyTopUp } from '../../hooks/useDailyTopUp';
import BalanceLabel from '../balance';

const BalanceButton = () => {
  const {
    sendDailyTopUp,
    creditAmount: credit,
    isAvailable: isTopUpAvailable,
  } = useDailyTopUp({
    onError: () => console.log('mint failed'),
  });
  const { balance, refetchBalance } = useBalance();
  const dialog = useConfirmDialog();

  const { state } = dialog;

  const confirm = async () => {
    dialog.confirm();
    await sendDailyTopUp();
    await refetchBalance();
    dialog.close();
  };

  if (!balance) {
    return null;
  }

  const newBalance = balance.sum + credit;
  const dialogOptions = isTopUpAvailable
    ? {
        title: 'Daily top-up',
        content: state.isLocked ? (
          <Typography>{`Updating Balance... Please wait`}</Typography>
        ) : (
          <Typography>
            {`Daily top-up adds ${credit} SNP to your account. New Balance will be ${newBalance} SNP`}
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
              {state.isConfirmed ? 'Sending...' : 'Get'}
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

  const trigger = isTopUpAvailable ? (
    <Badge badgeContent={1} color="primary">
      <Button onClick={dialog.open}>
        <BalanceLabel />
      </Button>
    </Badge>
  ) : (
    <Button onClick={dialog.open}>
      <BalanceLabel />
    </Button>
  );

  return (
    <AlertDialog
      open={state.isOpen}
      onClose={dialog.close}
      {...dialogOptions}
      trigger={trigger}
    />
  );
};

export default BalanceButton;
