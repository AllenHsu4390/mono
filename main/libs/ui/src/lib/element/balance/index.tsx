import { User } from '@main/models';
import { UserResponse } from '@main/rest';
import { FavoriteBorder } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useBalance } from '../../hooks/balance';

interface Props {
  user: User & UserResponse;
}

const BalanceLabel: React.FC<Props> = ({ user }) => {
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
