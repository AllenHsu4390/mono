import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Box, CardActionArea } from '@mui/material';
import { useState } from 'react';
import { InnerSkeleton } from './inner-skeleton';
import { Asset } from '@main/rest-models';

interface Props {
  asset: Asset;
  isPreloaded?: boolean;
}

export function AssetCard({ asset }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const showSkeleton = isLoading;

  const loadingSkeleton = (
    <Box
      sx={{
        display: `${showSkeleton ? 'initial' : 'none'}`,
      }}
    >
      <InnerSkeleton isFull={false} />
    </Box>
  );

  const cardContent = (
    <CardMedia
      sx={{
        height: '25vh',
      }}
      component="img"
      image={asset.src}
      alt="random"
      onLoad={() => setIsLoading(false)}
    />
  );

  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: 'none',
      }}
    >
      {loadingSkeleton}
      <CardActionArea
        sx={{
          display: `${showSkeleton ? 'none' : 'initial'}`,
        }}
      >
        {cardContent}
      </CardActionArea>
    </Card>
  );
}
