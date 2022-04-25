import { Alert, Container } from '@mui/material';
import { Asset, Cost, LikesCount } from '@main/models';
import { AssetResponse } from '@main/rest';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useReducer } from 'react';
import LikeButton from '../../element/like-button';
import CreatorAvatar from '../../element/avatar';
import PurchaseButton from '../../element/purchase/button';
import { useBalance } from '../../hooks/balance';
import { AssetCardFull } from './card-full';
import LikeCounter from '../../element/like-counter';
import TopupButton from '../../element/topup-button';

interface Props {
  asset: Asset & AssetResponse;
}

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

const likesReducer = (state: State, action: Action): State => {
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

export default function AssetInteractable({ asset }: Props) {
  const { balance, refetch: refetchBalance } = useBalance();
  const mutation = useMutation(
    async () => {
      const likeLink = asset.links.find((l) => l.rel === 'like');
      if (!likeLink) {
        throw new Error('missing like capability');
      }
      const res = await fetch(likeLink.url, {
        method: 'POST',
      });
      return res.json();
    },
    {
      onError: () => {
        dispatch({
          type: 'error',
        });
      },
    }
  );
  const [state, dispatch] = useReducer(likesReducer, {
    likes: 0,
    diff: 0,
    isShowDiff: false,
    isFirstLoad: true,
  });
  const {
    isLoading,
    isError,
    data,
    refetch: refetchLikes,
  } = useQuery<LikesCount>(
    ['likes', asset.id],
    async () => {
      const countLink = asset.links.find((l) => l.rel === 'like-count');
      if (!countLink) {
        throw new Error('missing like-count capability');
      }
      const res = await fetch(countLink.url);
      return res.json();
    },
    {
      refetchInterval: 5000,
    }
  );

  useEffect(() => {
    const newCount = data?.count || 0;

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
  }, [data?.count, isLoading, isError, state.isFirstLoad]);

  return (
    <Container
      sx={{
        pt: 16,
        pb: 10,
      }}
      maxWidth="md"
    >
      {state.errorMsg && (
        <Alert
          severity="error"
          sx={{
            mb: '2rem',
          }}
        >
          {state.errorMsg}
        </Alert>
      )}
      <AssetCardFull
        asset={asset}
        isPreloaded={true}
        avatar={
          <CreatorAvatar
            creator={asset.creator}
            linkTo={asset.links.find((l) => l.rel === 'creator')?.url || '/404'}
          />
        }
        counter={
          <LikeCounter
            likes={state.likes}
            isLoading={isLoading || isError}
            showToast={state.isShowDiff && !state.isFirstLoad}
            toastContent={state.diff > 0 && `+${Math.abs(state.diff)}`}
          />
        }
        actions={
          balance && balance.sum > Cost.Like ? (
            <LikeButton
              onConfirm={async () => {
                try {
                  await mutation.mutateAsync();
                  refetchLikes();
                  refetchBalance();
                } catch (e) {
                  dispatch({
                    type: 'error',
                  });
                }
              }}
            />
          ) : (
            <TopupButton />
          )
        }
      />
    </Container>
  );
}
