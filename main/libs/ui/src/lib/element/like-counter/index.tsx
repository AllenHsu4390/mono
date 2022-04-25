import { Typography, Box, useTheme } from '@mui/material';
import React from 'react';
import Toast from '../toast';

interface Props {
  isLoading: boolean;
  likes: number;
  showToast: boolean;
  toastContent: React.ReactNode;
}

const LikeCounter: React.FC<Props> = ({
  likes,
  isLoading,
  showToast,
  toastContent,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: '1rem',
        position: 'relative',
      }}
    >
      <Typography>{isLoading ? '...' : likes} Snaps</Typography>
      <Toast
        show={showToast}
        color={theme.palette.success.main}
        content={toastContent}
        sx={{
          left: '100%',
          top: '0',
        }}
      />
    </Box>
  );
};

export default LikeCounter;
