import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid } from '@mui/material';
import { Assets, Creator } from '@main/models';
import { AssetCard } from '../asset/card';
import { AssetCardSkeleton } from '../asset/skeleton';
import Link from '../../element/link';
import { AssetsResponse, CreatorResponse } from '@main/rest';
import { useAssets } from '../../hooks/assets';

interface Props {
  creator: Creator & CreatorResponse;
}

const Item = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid item xs={4} sm={4} md={4} lg={4}>
      {children}
    </Grid>
  );
};

export const AssetsGrid = ({ creator }: Props) => {
  const { assets, isLoading, isError, hasNextPage, fetchNextPage } =
    useAssets(creator);

  const assetPages = assets?.pages || [];
  const shouldShowSkeleton =
    isLoading || isError || !assets || assetPages.length === 0;

  const loadMore = () => {
    fetchNextPage();
  };

  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={loadMore}>
      <Grid container spacing={{ xs: 0.5, sm: 1, md: 1 }}>
        {[
          ...assetPages.map((page: Assets & AssetsResponse) =>
            page.assets.map((asset, index) => (
              <Item key={asset.id}>
                <Link
                  to={
                    page.links.filter((l) => l.rel === 'asset')[index].url ||
                    '/404'
                  }
                  key={asset.id}
                >
                  <AssetCard asset={asset} />
                </Link>
              </Item>
            ))
          ),
          ...(shouldShowSkeleton
            ? new Array(4).fill(null).map((_, index) => (
                <Item key={`${index}`}>
                  <AssetCardSkeleton isFull={false} />
                </Item>
              ))
            : []),
        ]}
      </Grid>
    </InfiniteScroll>
  );
};
