import { Gain } from '@main/rest-models';
import { Typography, Button } from '@mui/material';
import AlertDialog from '../../block/alert';
import { useBalance } from '../../hooks/balance';
import { useConfirmDialog } from '../../hooks/confirm-dialog';
import { useSendMint } from '../../hooks/mint';
import BalanceLabel from '../balance';

const BalanceButton = () => {
  const { sendMint, creditAmount: credit } = useSendMint({
    onError: () => console.log('mint failed'),
  });
  const { balance, refetchBalance } = useBalance();
  const dialog = useConfirmDialog();

  const { state } = dialog;

  const confirm = async () => {
    dialog.confirm();
    await sendMint();
    await refetchBalance();
    dialog.close();
  };

  if (!balance) {
    return null;
  }

  const newBalance = balance.sum + credit;
  const dialogOptions = {
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
        <Button variant="contained" disabled={state.isLocked} onClick={confirm}>
          {state.isConfirmed ? 'Sending...' : 'Add'}
        </Button>
      </>
    ),
  };

  return (
    <AlertDialog
      open={state.isOpen}
      onClose={dialog.close}
      {...dialogOptions}
      trigger={
        <Button onClick={dialog.open}>
          <BalanceLabel />
        </Button>
      }
    />
  );
};

export default BalanceButton;
