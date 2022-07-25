import { Typography, Box, CircularProgress } from '@mui/material';
import { useBalance } from '../../hooks/use-balance';
import Toast from '../toast';

export const BalanceCounter = () => {
  const { balance, counter } = useBalance();

  const hasBalance = !!balance;
  const showToast =
    hasBalance &&
    balance.sum !== counter.state.count &&
    !counter.state.isInitial;

  const Balance = () => {
    if (!hasBalance) {
      return null;
    }

    return <Typography>Balance: {balance.sum} SNP</Typography>;
  };

  const DiffToast = () => {
    if (!showToast) {
      return null;
    }
    const diff = balance.sum - counter.state.count;

    return (
      <Toast
        onDelete={() => counter.setCount(balance.sum)}
        timer={2000}
        content={
          <Typography>
            {diff >= 0 ? '+' : '-'}
            {Math.abs(diff)}
          </Typography>
        }
        sx={{
          right: '100%',
          top: '0',
          pr: '1rem',
          fontWeight: 'bold',
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Balance />
      <DiffToast />
    </Box>
  );
};
