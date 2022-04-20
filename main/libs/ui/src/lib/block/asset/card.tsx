import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Asset, Creator } from '@main/models';
import {
  Avatar,
  Box,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { InnerSkeleton } from './inner-skeleton';

interface Props {
  asset: Asset;
  creator: Creator;
  isFull: boolean;
  isPreloaded?: boolean;
  actions?: React.ReactNode;
}

export function AssetCard({
  asset,
  creator,
  isFull,
  isPreloaded = false,
  actions,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
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
    <>
      <CardMedia
        sx={{
          objectFit: 'cover',
          height: isFull ? '' : '16rem',
        }}
        component="img"
        image={asset.src}
        alt="random"
        onLoad={() => setIsLoading(false)}
      ></CardMedia>
      {isFull ? (
        <>
          <CardHeader
            sx={{
              padding: '1rem 0.3rem 0.3rem',
            }}
            avatar={<Avatar alt={creator.id} src={creator.avatarUrl} />}
            title={
              <Typography color="text.secondary">{`Creator name ✓`}</Typography>
            }
            subheader={
              <Typography color="text.secondary">{`50 minutes ago`}</Typography>
            }
          />
          <CardContent
            sx={{
              padding: '0.3rem',
            }}
          >
            <Typography variant="body2" color="text.secondary" component="p">
              {'Why this is some dank stuff? Let me tell you...'}
            </Typography>
          </CardContent>
        </>
      ) : null}
    </>
  );

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        boxShadow: 'none',
        position: 'relative',
      }}
    >
      {loadingSkeleton}
      {isFull && actions ? actions : null}
      {isFull ? (
        <Box sx={{ display: `${showSkeleton ? 'none' : 'initial'}` }}>
          {cardContent}
        </Box>
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
