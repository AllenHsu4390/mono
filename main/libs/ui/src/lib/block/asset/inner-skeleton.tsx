import { CardHeader, Skeleton, useTheme } from '@mui/material';

interface Props {
  isFull: boolean;
}

export const InnerSkeleton = ({ isFull }: Props) => {
  const theme = useTheme();

  return (
    <>
      <Skeleton
        sx={{
          width: isFull ? theme.breakpoints.values.lg : '100%',
          height: isFull ? theme.breakpoints.values.sm : '16rem',
        }}
        variant="rectangular"
      />
      {isFull ? (
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
                marginBottom: '0.4rem',
                borderRadius: 0,
              }}
            />
          }
          subheader={
            <Skeleton
              animation="pulse"
              sx={{
                width: '60%',
                height: '1rem',
                marginBottom: '0.4rem',
                borderRadius: 0,
              }}
            />
          }
        />
      ) : null}
    </>
  );
};
