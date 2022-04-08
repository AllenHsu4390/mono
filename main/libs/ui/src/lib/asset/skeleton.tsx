import Card from '@mui/material/Card';
import { CardHeader, Skeleton, useTheme } from '@mui/material';

interface Props {
  isFull: boolean;
}

export function AssetCardSkeleton({ isFull }: Props) {
  const theme = useTheme();
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
      <Skeleton
        sx={{
          width: isFull ? theme.breakpoints.values.lg : '240px',
          height: isFull ? theme.breakpoints.values.sm : '400px',
        }}
        variant="rectangular"
      />
      <CardHeader
        sx={{
          paddingLeft: 0,
          paddingRight: 0,
        }}
        avatar={
          <Skeleton
            animation="pulse"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            animation="pulse"
            height={16}
            width="90%"
            sx={{
              marginBottom: '6px',
              borderRadius: 0,
            }}
          />
        }
        subheader={
          <Skeleton
            animation="pulse"
            sx={{
              width: '60%',
              height: '16px',
              marginBottom: '6px',
              borderRadius: 0,
            }}
          />
        }
      />
    </Card>
  );
}
