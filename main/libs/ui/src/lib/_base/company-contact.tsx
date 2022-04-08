import { Copyright } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function CompanyContact() {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        margin: 'auto',
        width: '400px',
        textAlign: 'center',
      }}
      component="footer"
    >
      <Typography variant="subtitle1" color="text.secondary" component="p">
        <Copyright
          sx={{
            margin: '4px',
            display: 'inline-block',
            verticalAlign: '-10px',
          }}
        />
        {`Creator Network ${new Date().getFullYear()}`}
      </Typography>
    </Box>
  );
}
