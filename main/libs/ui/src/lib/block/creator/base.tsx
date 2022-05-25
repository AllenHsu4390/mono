import { Grid } from '@mui/material';
import React from 'react';

interface Props {
  description: React.ReactNode;
  avatar: React.ReactNode;
  title: React.ReactNode;
}

export function CreatorProfileBase({ description, avatar, title }: Props) {
  return (
    <Grid
      container
      sx={{
        bgcolor: 'background.paper',
        pt: '4rem',
        pb: '8rem',
      }}
      spacing={[1, 1, 2, 3]}
    >
      <Grid
        item
        md={2}
        lg={2}
        sm={3}
        xs={3}
        sx={{
          margin: 'auto',
        }}
      >
        {avatar}
      </Grid>
      <Grid
        item
        md={10}
        lg={10}
        sm={9}
        xs={9}
        sx={{
          margin: 'auto',
        }}
      >
        {title}
        {description}
      </Grid>
    </Grid>
  );
}
