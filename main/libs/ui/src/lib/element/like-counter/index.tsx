import { AssetResponse } from '@main/rest-models';
import { Typography, Box, useTheme } from '@mui/material';
import React, { useEffect, useReducer } from 'react';
import { useLikeCount } from '../../hooks/like';
import Toast from '../toast';

interface State {
  likes: number;
  diff: number;
  isShowDiff: boolean;
  isFirstLoad: boolean;
  errorMsg?: string;
}

interface Action {
  type: 'sync' | 'show-diff' | 'hide-diff' | 'init' | 'error';
  newLikes?: number;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'sync':
      return {
        ...state,
        diff: (action.newLikes || 0) - state.likes,
        likes: action.newLikes || 0,
      };
    case 'init':
      return {
        ...state,
        isFirstLoad: false,
      };
    case 'show-diff':
      return {
        ...state,
        isShowDiff: true,
      };
    case 'hide-diff':
      return {
        ...state,
        isShowDiff: false,
      };
    case 'error':
      return {
        ...state,
        errorMsg: 'Something went wrong',
      };
    default:
      return state;
  }
};

interface Props {
  asset: AssetResponse;
}

const LikeCounter = ({ asset }: Props) => {
  const theme = useTheme();
  const { isLoading, isError, likes } = useLikeCount({
    asset,
  });
  const [state, dispatch] = useReducer(reducer, {
    likes: 0,
    diff: 0,
    isShowDiff: false,
    isFirstLoad: true,
  });

  useEffect(() => {
    const newCount = likes?.count || 0;

    if (isLoading || isError || newCount === 0) return;

    dispatch({
      type: 'sync',
      newLikes: newCount,
    });
    if (state.isFirstLoad) {
      dispatch({
        type: 'init',
      });
      return;
    }
    dispatch({
      type: 'show-diff',
    });
    setTimeout(() => {
      dispatch({
        type: 'hide-diff',
      });
    }, 3000);
  }, [likes?.count, isLoading, isError, state.isFirstLoad]);

  return (
    <Box
      sx={{
        py: '1rem',
        px: '0.5rem',
        position: 'relative',
      }}
    >
      <Typography>
        {isLoading || isError || !likes ? '...' : likes.count} snaps
      </Typography>
      <Toast
        show={state.isShowDiff && !state.isFirstLoad}
        content={
          state.diff > 0 && (
            <Typography>{`+${Math.abs(state.diff)}`}</Typography>
          )
        }
        color={theme.palette.success.main}
        sx={{
          right: '100%',
          top: '0',
          p: '1rem',
          fontWeight: 'bold',
        }}
      />
    </Box>
  );
};

export default LikeCounter;
