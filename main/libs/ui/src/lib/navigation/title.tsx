import { Typography } from '@mui/material';
import Link from '../link';

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
