import { Typography } from '@mui/material';
import Link from '../../element/link';

export const Title = () => {
  return (
    <Link to="/">
      <Typography
        variant="h3"
        color="text.primary"
        sx={{
          cursor: 'pointer',
        }}
      >
        CREATOR NETWORK
      </Typography>
    </Link>
  );
};
