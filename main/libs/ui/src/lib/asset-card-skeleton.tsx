import React from 'react';

import Card from '@mui/material/Card';
import { CardHeader, Skeleton } from '@mui/material';

interface Props {
  isFull: boolean;
}

export function AssetCardSkeleton({ isFull }: Props) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        boxShadow: 'none',
      }}
    >
      <Skeleton
        sx={{ width: '240px', height: isFull ? '' : '400px' }}
        variant="rectangular"
      />
      <CardHeader
        sx={{
          paddingLeft: 0,
          paddingRight: 0,
        }}
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={16}
            width="90%"
            sx={{
              marginBottom: '6px',
              borderRadius: 0,
            }}
          />
        }
        subheader={
          <Skeleton
            animation="wave"
            sx={{
              width: '60%',
              height: '16px',
              marginBottom: '6px',
              borderRadius: 0,
            }}
          />
        }
      />
    </Card>
  );
}
