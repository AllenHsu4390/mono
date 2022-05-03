import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Asset } from '@main/models';
import { Box, CardActionArea, useTheme } from '@mui/material';
import { useState } from 'react';
import { InnerSkeleton } from './inner-skeleton';

interface Props {
  asset: Asset;
  isPreloaded?: boolean;
}

export function AssetCard({ asset, isPreloaded = false }: Props) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const showSkeleton = isLoading && !isPreloaded;

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
