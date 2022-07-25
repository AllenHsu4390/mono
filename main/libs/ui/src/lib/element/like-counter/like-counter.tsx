import type { AssetResponse } from '@main/rest-models';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useLikeCount } from '../../hooks/use-like-count';
import Toast from '../toast';

interface Props {
  asset: AssetResponse;
}

export const LikeCounter = ({ asset }: Props) => {
  const { isLoading, isError, likes, counter } = useLikeCount({
    asset,
    refetchInterval: 5000,
  });

  const hasLikes = !isLoading && !isError && !!likes;
  const showToast =
    hasLikes && likes.count > counter.state.count && !counter.state.isInitial;

  const Likes = () => {
    if (!hasLikes) {
      return <CircularProgress size={'1rem'} />;
    }

    return (
      <Typography>
        {hasLikes ? likes.count : <CircularProgress size={'1rem'} />} snaps
      </Typography>
    );
  };

  const DiffToast = () => {
    if (!showToast) {
      return null;
    }

    const diff = likes.count - counter.state.count;

    return (
      <Toast
        onDelete={() => counter.setCount(likes.count)}
        timer={2000}
        content={
          <Typography>
            {diff >= 0 ? '+' : '-'}
            {Math.abs(diff)}
          </Typography>
        }
        sx={{
          right: '100%',
          top: '0',
          p: '1rem',
          fontWeight: 'bold',
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        py: '1rem',
        px: '0.5rem',
        position: 'relative',
      }}
    >
      <Likes />
      <DiffToast />
    </Box>
  );
};
