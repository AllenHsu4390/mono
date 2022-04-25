import { Asset } from '@main/models';
import { AssetResponse } from '@main/rest';
import { Favorite } from '@mui/icons-material';
import { Typography, useTheme, Button } from '@mui/material';
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
        <Button
          variant="contained"
          sx={{
            textAlign: 'center',
            px: '1rem',
          }}
          onClick={handleClickOpen}
          startIcon={
            <Favorite
              fontSize="small"
              sx={{
                verticalAlign: 'middle',
              }}
            />
          }
        >
          <Typography
            component="p"
            sx={{
              display: 'inline',
              verticalAlign: 'middle',
            }}
          >
            60 SNP
          </Typography>
        </Button>
      }
    />
  );
};

export default LikeButton;
