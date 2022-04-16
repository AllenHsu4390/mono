import Card from '@mui/material/Card';
import { InnerSkeleton } from './inner-skeleton';

interface Props {
  isFull: boolean;
}

export function AssetCardSkeleton({ isFull }: Props) {
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
      <InnerSkeleton isFull={isFull} />
    </Card>
  );
}
