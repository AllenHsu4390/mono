import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Asset, Creator } from '@main/models';
import { Avatar, CardContent, CardHeader, Typography } from '@mui/material';

interface Props {
  asset: Asset;
  creator: Creator;
  isFull: boolean;
}

export function AssetCard({ asset, creator, isFull }: Props) {
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
      <CardMedia
        sx={{
          objectFit: 'cover',
          height: isFull ? '' : '300px',
        }}
        component="img"
        image={asset.src}
        alt="random"
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
    </Card>
  );
}
