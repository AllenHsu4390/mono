import { UserResponse } from '@main/rest-models';
import { Typography } from '@mui/material';
import { useBalance } from '../../hooks/balance';

interface Props {
  user: UserResponse;
}

const BalanceLabel = ({ user }: Props) => {
  const { balance } = useBalance();
  return (
    <Typography
      component="p"
      sx={{
        ml: '0.2rem',
        display: 'inline',
        verticalAlign: 'middle',
      }}
    >
      Balance: {!balance ? '...' : balance.sum} SNP
    </Typography>
  );
};

export default BalanceLabel;
