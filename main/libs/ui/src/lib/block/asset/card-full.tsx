import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Asset } from '@main/models';
import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { InnerSkeleton } from './inner-skeleton';
import { indigo } from '@mui/material/colors';

interface Props {
  asset: Asset;
  isPreloaded?: boolean;
  actions?: React.ReactNode;
  avatar?: React.ReactNode;
  counter?: React.ReactNode;
  avatarTitle?: React.ReactNode;
}

export function AssetCardFull({
  asset,
  avatar,
  avatarTitle,
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
          px: '0.5rem',
        }}
      >
        <CardHeader
          sx={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
          avatar={avatar}
          title={avatarTitle}
          subheader={<Typography>Instagram · Discord · YouTube</Typography>}
        />
        <Stack
          spacing={0}
          direction="row"
          sx={{
            marginLeft: 'auto',
          }}
        >
          {counter}
          {actions ? actions : null}
        </Stack>
      </CardActions>
    </Card>
  );
}
