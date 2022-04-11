import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Asset, Creator } from '@main/models';
import { Avatar, CardContent, CardHeader, Typography } from '@mui/material';
import { useState } from 'react';
import { InnerSkeleton } from './inner-skeleton';

interface Props {
  asset: Asset;
  creator: Creator;
  isFull: boolean;
}

export function AssetCard({ asset, creator, isFull }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  const loadingSkeleton = (
    <div
      style={{
        display: `${isLoading ? 'initial' : 'none'}`,
      }}
    >
      <InnerSkeleton isFull={isFull} />
    </div>
  );

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
      {loadingSkeleton}
      <div
        style={{
          display: `${isLoading ? 'none' : 'initial'}`,
        }}
      >
        <CardMedia
          sx={{
            objectFit: 'cover',
            height: isFull ? '' : '300px',
          }}
          component="img"
          image={asset.src}
          alt="random"
          onLoad={() => setIsLoading(false)}
        ></CardMedia>
        <CardHeader
          sx={{
            padding: '16px 4px 4px',
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
            padding: '4px',
          }}
        >
          <Typography variant="body2" color="text.secondary" component="p">
            {'Why this is some dank stuff? Let me tell you...'}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
