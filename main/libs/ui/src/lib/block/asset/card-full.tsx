import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActions, CardContent, CardHeader, Stack } from '@mui/material';
import { AssetResponse } from '@main/rest-models';
import { useState } from 'react';

interface Props {
  asset: AssetResponse;
  actions?: React.ReactNode;
  avatar?: React.ReactNode;
  counter?: React.ReactNode;
  avatarTitle?: React.ReactNode;
  contact?: React.ReactNode;
}

export function AssetCardFull({
  asset,
  avatar,
  avatarTitle,
  counter,
  actions,
  contact,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: 'none',
        position: 'relative',
      }}
    >
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
          subheader={contact}
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
      <CardContent
        sx={{
          px: 0,
          pb: 0,
        }}
      >
        <CardMedia
          sx={{
            margin: 'auto',
            cursor: 'pointer',
            width: isExpanded ? '100%' : 'auto',
            height: isExpanded ? 'auto' : '60vh',
          }}
          component="img"
          image={asset.src}
          alt="random"
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </CardContent>
    </Card>
  );
}
