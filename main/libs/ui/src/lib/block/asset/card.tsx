import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Asset } from '@main/models';
import { Box, CardActionArea, useTheme } from '@mui/material';
import { useState } from 'react';
import { InnerSkeleton } from './inner-skeleton';
import OverlapPanel from '../overlap-panel';

interface Props {
  asset: Asset;
  isFull: boolean;
  isPreloaded?: boolean;
  actions?: React.ReactNode;
  avatar?: React.ReactNode;
}

export function AssetCard({
  asset,
  avatar,
  isFull,
  isPreloaded = false,
  actions,
}: Props) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const showSkeleton = isLoading && !isPreloaded;

  const loadingSkeleton = (
    <Box
      sx={{
        display: `${showSkeleton ? 'initial' : 'none'}`,
      }}
    >
      <InnerSkeleton isFull={isFull} />
    </Box>
  );

  const cardContent = (
    <CardMedia
      sx={{
        height: isFull ? '40rem' : '16rem',
        [theme.breakpoints.down('md')]: {
          height: isFull ? '30rem' : '16rem',
        },
        [theme.breakpoints.down('sm')]: {
          height: isFull ? '20rem' : '16rem',
        },
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
        position: 'relative',
        '@media (hover: hover)': {
          '&:hover': {
            '& .panel': {
              right: 0,
            },
          },
        },
      }}
      onClick={() => setIsPanelOpen(!isPanelOpen)}
    >
      {loadingSkeleton}
      {isFull ? (
        <>
          <OverlapPanel
            className="panel"
            sx={{
              position: 'absolute',
              bottom: '0',
              right: '-5.6rem',
              width: '5.6rem',
              height: '100%',
              zIndex: 2,
              transition: '0.1s ease-out',
              '@media (hover: none)': {
                right: isPanelOpen ? '0' : '-5.6rem',
              },
            }}
          >
            {isFull && avatar ? avatar : null}
            {isFull && actions ? actions : null}
          </OverlapPanel>
          <Box sx={{ display: `${showSkeleton ? 'none' : 'initial'}` }}>
            {cardContent}
          </Box>
        </>
      ) : (
        <CardActionArea
          sx={{ display: `${showSkeleton ? 'none' : 'initial'}` }}
        >
          {cardContent}
        </CardActionArea>
      )}
    </Card>
  );
}
