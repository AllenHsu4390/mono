import { Copyright } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

export default function CompanyContact() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{
        my: '3rem',
      }}
    >
      {`© Creator Network ${new Date().getFullYear()}`}
    </Typography>
  );
}
