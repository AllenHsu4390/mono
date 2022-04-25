import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Asset } from '@main/models';
import { Box, CardActions, CardContent, Stack, useTheme } from '@mui/material';
import { useState } from 'react';
import { InnerSkeleton } from './inner-skeleton';

interface Props {
  asset: Asset;
  isPreloaded?: boolean;
  actions?: React.ReactNode;
  avatar?: React.ReactNode;
  counter?: React.ReactNode;
}

export function AssetCardFull({
  asset,
  avatar,
  counter,
  isPreloaded = false,
  actions,
}: Props) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const showSkeleton = isLoading && !isPreloaded;

  const loadingSkeleton = (
    <Box
      sx={{
        display: `${showSkeleton ? 'initial' : 'none'}`,
      }}
    >
      <InnerSkeleton isFull={true} />
    </Box>
  );

  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: 'none',
        position: 'relative',
      }}
    >
      <CardContent
        sx={{
          px: 0,
          pb: 0,
        }}
      >
        {loadingSkeleton}
        <Box sx={{ display: `${showSkeleton ? 'none' : 'initial'}` }}>
          <CardMedia
            sx={{
              height: '40rem',
              [theme.breakpoints.down('md')]: {
                height: '30rem',
              },
              [theme.breakpoints.down('sm')]: {
                height: '20rem',
              },
            }}
            component="img"
            image={asset.src}
            alt="random"
            onLoad={() => setIsLoading(false)}
          />
        </Box>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          px: 0,
          pb: 0,
        }}
      >
        {avatar}
        {counter}
        <Box
          sx={{
            marginLeft: 'auto',
          }}
        >
          {actions ? actions : null}
        </Box>
      </CardActions>
    </Card>
  );
}
