import { Copyright } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Wordmark } from '../../element/company/wordmark';

export default function CompanyContact() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        my: '3rem',
      }}
    >
      © <Wordmark /> {`${new Date().getFullYear()}`}
    </Typography>
  );
}
