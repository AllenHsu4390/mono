import type { AssetResponse } from '@main/rest-models';
import { Typography, Box, useTheme } from '@mui/material';
import { useState } from 'react';
import { useLikeCount } from '../../hooks/use-like-count';
import Toast from '../toast';

interface Props {
  asset: AssetResponse;
}

const useCounter = () => {
  const [state, setState] = useState({
    count: 0,
    isInitial: true,
  });
  return {
    state,
    setCount: (count: number) =>
      setState({
        isInitial: false,
        count,
      }),
  };
};

const LikeCounter = ({ asset }: Props) => {
  const theme = useTheme();
  const counter = useCounter();
  const { isLoading, isError, likes } = useLikeCount({
    asset,
    refetchInterval: 5000,
    onSuccess: counter.state.isInitial
      ? (likesData) => counter.setCount(likesData.count)
      : undefined,
  });

  const hasLikes = !isLoading && !isError && !!likes;
  const showToast =
    hasLikes && likes.count > counter.state.count && !counter.state.isInitial;

  return (
    <Box
      sx={{
        py: '1rem',
        px: '0.5rem',
        position: 'relative',
      }}
    >
      <Typography>{hasLikes ? likes?.count : '...'} snaps</Typography>
      {showToast ? (
        <Toast
          onDelete={() => counter.setCount(likes.count)}
          timer={2000}
          content={
            <Typography>{`+${Math.abs(
              likes.count - counter.state.count
            )}`}</Typography>
          }
          color={theme.palette.success.main}
          sx={{
            right: '100%',
            top: '0',
            p: '1rem',
            fontWeight: 'bold',
          }}
        />
      ) : null}
    </Box>
  );
};

export default LikeCounter;
