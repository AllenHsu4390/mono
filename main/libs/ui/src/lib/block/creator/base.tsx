import { Box, Container, Grid, Stack } from '@mui/material';
import React from 'react';

interface Props {
  description: React.ReactNode;
  avatar: React.ReactNode;
  controls: React.ReactNode;
}

export function CreatorProfileBase({ description, avatar, controls }: Props) {
  return (
    <Grid
      container
      sx={{
        bgcolor: 'background.paper',
        pt: 14,
        pb: 8,
      }}
      spacing={[1, 1, 2, 3]}
    >
      <Grid
        item
        md={3}
        lg={2}
        sx={{
          margin: 'auto',
        }}
      >
        {avatar}
      </Grid>
      <Grid
        item
        md={6}
        lg={8}
        sx={{
          margin: 'auto',
        }}
      >
        {description}
      </Grid>
      <Grid
        item
        md={3}
        lg={2}
        sx={{
          margin: 'auto',
        }}
      >
        {controls}
      </Grid>
    </Grid>
  );
}
