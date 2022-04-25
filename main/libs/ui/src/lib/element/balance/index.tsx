import { User } from '@main/models';
import { UserResponse } from '@main/rest';
import { FavoriteBorder } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useBalance } from '../../providers/balance';

interface Props {
  user: User & UserResponse;
}

const BalanceLabel: React.FC<Props> = ({ user }) => {
  const balance = useBalance();
  return (
    <>
      <FavoriteBorder
        fontSize="small"
        sx={{
          verticalAlign: 'middle',
        }}
      />
      <Typography
        component="p"
        sx={{
          ml: '0.2rem',
          display: 'inline',
          verticalAlign: 'middle',
        }}
      >
        {!balance ? '...' : balance.sum} SNP
      </Typography>
    </>
  );
};

export default BalanceLabel;
