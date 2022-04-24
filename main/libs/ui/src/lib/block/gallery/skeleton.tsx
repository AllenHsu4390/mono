import React from 'react';
import { Container, Grid } from '@mui/material';
import { AssetCardSkeleton } from '../asset/skeleton';

export const AssetsGridSkeleton: React.FC = () => {
  return (
    <Container>
      <Grid
        container
        spacing={{
          xs: 1,
          sm: 2,
          md: 3,
        }}
      >
        {new Array(8).fill(null).map((_, index) => (
          <Grid item key={index} xs={12} sm={4} md={4} lg={3}>
            <AssetCardSkeleton isFull={false} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
