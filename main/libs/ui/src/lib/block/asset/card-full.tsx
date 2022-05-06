import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { AssetResponse } from '@main/rest-models';

interface Props {
  asset: AssetResponse;
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
  actions,
}: Props) {
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
        <CardMedia
          sx={{
            margin: 'auto',
            width: 'auto',
            maxHeight: '50vh',
          }}
          component="img"
          image={asset.src}
          alt="random"
        />
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
