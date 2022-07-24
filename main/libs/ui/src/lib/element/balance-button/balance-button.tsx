import { Typography, Button, Badge, CircularProgress } from '@mui/material';
import AlertDialog from '../../block/alert';
import { useBalance } from '../../hooks/use-balance';
import { useConfirmDialog } from '../../hooks/use-confirm-dialog';
import { useDailyTopUp } from '../../hooks/use-daily-top-up';

export const BalanceButton = () => {
  const {
    sendDailyTopUp,
    creditAmount: credit,
    isAvailable: isTopUpAvailable,
  } = useDailyTopUp({
    onError: () => console.log('mint failed'),
  });
  const { balance, refetchBalance, isBalanceLoading } = useBalance();
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

  const BalanceLabel = () => {
    if (isBalanceLoading || !balance) {
      return <CircularProgress size={'1rem'} />;
    }

    return (
      <Typography
        component="p"
        sx={{
          ml: '0.2rem',
          display: 'inline',
          verticalAlign: 'middle',
        }}
      >
        Balance: {balance.sum} SNP
      </Typography>
    );
  };

  const button = (
    <Button onClick={dialog.open}>
      <BalanceLabel />
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
      open={state.isOpen}
      onClose={dialog.close}
      {...dialogOptions}
      trigger={trigger}
    />
  );
};
