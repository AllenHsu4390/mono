import { Asset } from '@main/models';
import { AssetResponse } from '@main/rest';
import { FavoriteBorder } from '@mui/icons-material';
import { IconButton, Typography, useTheme, Box, Button } from '@mui/material';
import React, { useReducer } from 'react';
import AlertDialog from '../../block/alert';
import { useBalance } from '../../hooks/balance';
import { useLikeCount, useSendLike } from '../../hooks/like';

interface State {
  isOpen: boolean;
  isLocked: boolean;
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
      };
    case 'confirm':
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
      content={'This will use 60 SNP from your account'}
      actions={
        <>
          <Button onClick={handleClose}>Cancel</Button>
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
            }}
          >
            Snap it
          </Button>
        </>
      }
      trigger={
        <IconButton
          size="large"
          aria-label="like asset"
          aria-controls="like"
          aria-haspopup="true"
          sx={{
            borderRadius: '0',
            textAlign: 'center',
            padding: '1rem',
            color: theme.palette.primary.main,
          }}
          onClick={handleClickOpen}
        >
          <FavoriteBorder
            fontSize="small"
            sx={{
              verticalAlign: 'middle',
            }}
          />
          <Typography
            component="p"
            sx={{
              ml: '0.2rem',
              display: 'inline',
              verticalAlign: 'middle',
            }}
          >
            60 SNP
          </Typography>
        </IconButton>
      }
    />
  );
};

export default LikeButton;
