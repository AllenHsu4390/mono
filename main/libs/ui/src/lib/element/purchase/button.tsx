import { Add } from '@mui/icons-material';
import {
  IconButton,
  SxProps,
  Theme,
  Typography,
  useTheme,
  Box,
} from '@mui/material';
import { useBalance } from '../../providers/balance';

const PurchaseButton: React.FC = () => {
  const theme = useTheme();
  const balance = useBalance();
  const textStyle: SxProps<Theme> = {
    color: theme.palette.secondary.light,
    fontWeight: 'bold',
    textShadow: '1px 1px 3px pink',
  };
  return (
    <IconButton
      size="large"
      aria-label="like asset"
      aria-controls="like"
      aria-haspopup="true"
      sx={{
        borderRadius: '0',
        position: 'relative',
        display: 'block',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      <Box>
        <Typography
          sx={{
            ...textStyle,
          }}
        >
          {balance?.sum || 'unknown'} SNP
        </Typography>
      </Box>
      <Box>
        <Add
          fontSize="large"
          sx={{
            mt: '0.2rem',
            display: 'inline-flex',
            ...textStyle,
          }}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            ...textStyle,
          }}
        >
          Add more
        </Typography>
      </Box>
    </IconButton>
  );
};

export default PurchaseButton;
