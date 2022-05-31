import { AssetResponse } from '@main/rest-models';
import { Typography, Box, useTheme } from '@mui/material';
import { useReducer } from 'react';
import { useLikeCount } from '../../hooks/use-like-count';
import Toast from '../toast';

interface State {
  likes: number;
  diff: number;
  errorMsg?: string;
  isShowDiff: boolean;
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
  const [state, dispatch] = useReducer(reducer, {
    likes: 0,
    diff: 0,
    isShowDiff: false,
  });
  const { isLoading, isError, likes } = useLikeCount({
    asset,
    refetchInterval: 5000,
    onSuccess: () => {
      const newCount = likes?.count || 0;

      if (newCount === 0) return;

      // sync likes
      dispatch({
        type: 'sync',
        newLikes: newCount,
      });

      if (state.diff > 0) {
        dispatch({
          type: 'show-diff',
        });
      }
    },
  });

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
        show={state.isShowDiff}
        onHide={() => dispatch({ type: 'hide-diff' })}
        timer={1000}
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
