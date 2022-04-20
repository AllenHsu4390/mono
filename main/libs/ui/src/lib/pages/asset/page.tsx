import {
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { Asset, Creator, LikesCount, User } from '@main/models';
import Page from '../_base/page';
import { AssetCard } from '../../block/asset/card';
import { AssetResponse, CreatorResponse, UserResponse } from '@main/rest';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import { useQuery } from 'react-query';
import { useEffect, useReducer } from 'react';
import LikeButton from '../../element/like';

interface Props {
  asset: Asset & AssetResponse;
  creator: Creator & CreatorResponse;
  user: User & UserResponse;
}

interface State {
  likes: number;
  diff: number;
  isShowDiff: boolean;
  isFirstLoad: boolean;
}

interface Action {
  type: 'sync' | 'show-diff' | 'hide-diff' | 'init';
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
    default:
      return state;
  }
};

export default function AssetPage({ asset, creator, user }: Props) {
  const [state, dispatch] = useReducer(likesReducer, {
    likes: 0,
    diff: 0,
    isShowDiff: false,
    isFirstLoad: true,
  });
  const intervalMs = 5000;
  const { isLoading, isError, data } = useQuery<LikesCount>(
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
      refetchInterval: intervalMs,
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
    <Page hasNavigation={true} hasFooter={true} user={user}>
      <Container
        sx={{
          pt: 16,
          pb: 10,
        }}
        maxWidth="md"
      >
        <AssetCard
          asset={asset}
          creator={creator}
          isFull={true}
          isPreloaded={true}
          actions={
            <Box
              sx={{
                position: 'absolute',
                bottom: '50%',
                right: '0',
                zIndex: 2,
              }}
            >
              <LikeButton
                likes={state.likes}
                onClick={async () => {
                  const likeLink = asset.links.find((l) => l.rel === 'like');
                  if (!likeLink) {
                    throw new Error('missing like capability');
                  }
                  dispatch({
                    type: 'sync',
                    newLikes: state.likes + 1,
                  });
                  await fetch(likeLink.url, {
                    method: 'POST',
                  });
                }}
                showToast={state.isShowDiff && !state.isFirstLoad}
                toastContent={state.diff > 0 && `+${Math.abs(state.diff)}`}
                isLoading={isLoading || isError}
              />
            </Box>
          }
        />
      </Container>
    </Page>
  );
}
