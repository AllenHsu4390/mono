import { Container, IconButton } from '@mui/material';
import { Asset, Creator, LikesCount, User } from '@main/models';
import Page from '../_base/page';
import { AssetCard } from '../../block/asset/card';
import { AssetResponse, CreatorResponse, UserResponse } from '@main/rest';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';

interface Props {
  asset: Asset & AssetResponse;
  creator: Creator & CreatorResponse;
  user: User & UserResponse;
}

export default function AssetPage({ asset, creator, user }: Props) {
  const [likes, setLikes] = useState<number>(0);
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
    setLikes(data?.count || 0);
  }, [data]);

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
        />
        <IconButton
          size="large"
          aria-label="follow creator"
          aria-controls="creator-follow"
          aria-haspopup="true"
          color="inherit"
          sx={{
            borderRadius: 0,
          }}
          onClick={async () => {
            const likeLink = asset.links.find((l) => l.rel === 'like');
            if (!likeLink) {
              throw new Error('missing like capability');
            }
            setLikes(likes + 1);
            await fetch(likeLink.url, {
              method: 'POST',
            });
          }}
        >
          <FavoriteBorderOutlined fontSize="large" />
          {isError || isLoading ? null : likes}
        </IconButton>
      </Container>
    </Page>
  );
}
