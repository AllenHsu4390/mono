import type { AssetResponse } from '@main/rest-models';
import { Typography, Box, useTheme } from '@mui/material';
import { useState } from 'react';
import { useLikeCount } from '../../hooks/use-like-count';
import Toast from '../toast';

interface Props {
  asset: AssetResponse;
}

const LikeCounter = ({ asset }: Props) => {
  const theme = useTheme();
  const [state, setState] = useState({
    likes: 0,
    isInitial: true,
  });
  const { isLoading, isError, likes } = useLikeCount({
    asset,
    refetchInterval: 5000,
    onSuccess: state.isInitial
      ? (likesData) => {
          setState({
            ...state,
            isInitial: false,
            likes: likesData.count,
          });
        }
      : undefined,
  });

  const hasLikes = !isLoading && !isError && !!likes;
  const showToast = hasLikes && likes.count > state.likes && !state.isInitial;

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
          onDelete={() =>
            setState({
              ...state,
              likes: likes.count,
            })
          }
          timer={2000}
          content={
            <Typography>{`+${Math.abs(likes.count - state.likes)}`}</Typography>
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
