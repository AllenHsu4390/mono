import { Gain } from '@main/rest-models';
import { Typography, Button } from '@mui/material';
import AlertDialog from '../../block/alert';
import { useBalance } from '../../hooks/balance';
import { useConfirmDialog } from '../../hooks/confirm-dialog';
import { useSendMint } from '../../hooks/mint';
import BalanceLabel from '../balance';

const BalanceButton = () => {
  const { sendMint } = useSendMint({
    onError: () => console.log('mint failed'),
  });
  const { balance, refetchBalance } = useBalance();

  const dialog = useConfirmDialog();
  const { state } = dialog;
  const credit = Gain.TopUpMedium;

  const confirm = async () => {
    dialog.confirm();
    await sendMint();
    await refetchBalance();
    dialog.close();
  };

  if (!balance) {
    return null;
  }

  const newBalance = balance.sum + Number(credit.toString());
  const dialogOptions = {
    title: 'Add more SNP?',
    content: state.isLocked ? (
      <Typography>{`Updating Balance... Please wait`}</Typography>
    ) : (
      <Typography>
        {`This will add ${credit} SNP to your account. New Balance will be ${newBalance} SNP`}
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
