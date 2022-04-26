import { Asset, Cost } from '@main/models';
import { AssetResponse } from '@main/rest';
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import { Typography, Button, IconButton, useTheme } from '@mui/material';
import React, { useReducer } from 'react';
import AlertDialog from '../../block/alert';
import { useBalance } from '../../hooks/balance';
import { useLikeCount, useSendLike } from '../../hooks/like';

interface State {
  isOpen: boolean;
  isLocked: boolean;
  isConfirmed?: boolean;
}

interface Action {
  type: 'open' | 'close' | 'confirm' | 'cancel';
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        isOpen: true,
        isLocked: false,
        isConfirmed: false,
      };
    case 'confirm':
      return {
        ...state,
        isOpen: true,
        isConfirmed: true,
        isLocked: true,
      };
    case 'cancel':
    case 'close':
      return {
        ...state,
        isOpen: false,
        isLocked: true,
      };
    default:
      return state;
  }
};

interface Props {
  asset: Asset & AssetResponse;
}

const LikeButton: React.FC<Props> = ({ asset }) => {
  const theme = useTheme();
  const { refetchBalance } = useBalance();
  const { sendLike } = useSendLike({
    asset,
  });
  const { refetchLikes } = useLikeCount({
    asset,
  });
  const [state, dispatch] = useReducer(reducer, {
    isOpen: false,
    isLocked: false,
  });

  const handleClickOpen = () => {
    dispatch({
      type: 'open',
    });
  };

  const handleClose = () => {
    dispatch({
      type: 'close',
    });
  };

  return (
    <AlertDialog
      open={state.isOpen}
      onClose={handleClose}
      title={'Are you sure?'}
      content={
        <Typography>
          {`This will use ${Cost.Like} SNP from your account`}
        </Typography>
      }
      actions={
        <>
          <Button onClick={handleClose}>
            {state.isConfirmed ? 'Close' : 'Cancel'}
          </Button>
          <Button
            variant="contained"
            disabled={state.isLocked}
            onClick={async () => {
              dispatch({
                type: 'confirm',
              });
              await sendLike();
              await refetchLikes();
              await refetchBalance();
              dispatch({
                type: 'close',
              });
            }}
          >
            {state.isConfirmed ? 'Sending...' : 'Agree'}
          </Button>
        </>
      }
      trigger={
        <IconButton
          onClick={handleClickOpen}
          sx={{
            borderRadius: '0',
            transition: 'color 0.5s ease',
            color: theme.palette.primary.main,
            ':hover': {
              color: theme.palette.error.main,
              background: 'initial',
            },
            width: '3.2rem',
            height: '3.5rem',
          }}
        >
          <FavoriteBorderOutlined
            sx={{
              fontSize: '2rem',
            }}
          />
        </IconButton>
      }
    />
  );
};

export default LikeButton;
