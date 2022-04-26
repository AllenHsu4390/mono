import React from 'react';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid } from '@mui/material';
import { Assets, Creator } from '@main/models';
import { Error } from '@main/models';
import { AssetCard } from '../asset/card';
import { AssetCardSkeleton } from '../asset/skeleton';
import Link from '../../element/link';
import { AssetsResponse } from '@main/rest';

interface Props {
  creator: Creator;
  assetsUrl: string;
}

const Item: React.FC = ({ children }) => {
  return (
    <Grid item xs={4} sm={4} md={4} lg={4}>
      {children}
    </Grid>
  );
};

export const AssetsGrid: React.FC<Props> = ({ creator, assetsUrl }) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery<Assets & AssetsResponse, Error>(
      assetsUrl,
      async ({ pageParam: nextUrl = assetsUrl }: { pageParam?: string }) => {
        const response = await fetch(nextUrl);
        return response.json();
      },
      {
        getNextPageParam: (lastPage): undefined | string => {
          return lastPage.links.find((l) => l.rel === 'next')?.url;
        },
      }
    );

  const assetPages = data?.pages || [];
  const shouldShowSkeleton =
    isLoading || isError || !data || assetPages.length === 0;

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
