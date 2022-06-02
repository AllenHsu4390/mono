import { Theme } from '@emotion/react';
import { SxProps, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import Link from '../link';

interface Props {
  to: string;
  label: string;
  sx?: SxProps<Theme>;
}

export const CreatorLink = ({ to, label, sx }: Props) => {
  return (
    <Link key={to} to={to}>
      <Typography
        color="text.secondary"
        sx={{
          transition: 'color 0.6s ease',
          textTransform: 'none',
          display: 'inline',
          ':hover': {
            color: indigo[600],
            textDecoration: 'underline',
          },
          ...sx,
        }}
      >
        {label}
      </Typography>
    </Link>
  );
};
