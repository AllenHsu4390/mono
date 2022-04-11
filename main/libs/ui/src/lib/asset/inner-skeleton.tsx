import { CardHeader, Skeleton, useTheme } from '@mui/material';

interface Props {
  isFull: boolean;
}

export const InnerSkeleton: React.FC<Props> = ({ isFull }) => {
  const theme = useTheme();

  return (
    <>
      <Skeleton
        sx={{
          width: isFull ? theme.breakpoints.values.lg : '240px',
          height: isFull ? theme.breakpoints.values.sm : '300px',
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
    </>
  );
};
