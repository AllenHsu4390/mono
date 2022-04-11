import React from 'react';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { CardActionArea, Container, Grid } from '@mui/material';
import { Assets, Creator } from '@main/models';
import { Error } from '@main/models';
import { AssetCard } from '../asset/card';
import { AssetCardSkeleton } from '../asset/skeleton';
import Link from '../link';
import { AssetsResponse } from '@main/rest';

interface Props {
  creator: Creator;
  assetsUrl: string;
}

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
    <Container
      sx={{
        paddingY: '8px',
      }}
    >
      <InfiniteScroll hasMore={hasNextPage} loadMore={loadMore}>
        <Grid
          container
          spacing={{
            xs: 2,
            sm: 3,
            md: 4,
          }}
        >
          {[
            ...assetPages.map((page: Assets & AssetsResponse) =>
              page.assets.map((asset, index) => (
                <Grid item key={asset.id} xs={12} sm={4} md={4} lg={3}>
                  <Link
                    to={
                      page.links.filter((l) => l.rel === 'asset')[index].url ||
                      '/404'
                    }
                    key={asset.id}
                  >
                    <CardActionArea>
                      <AssetCard
                        asset={asset}
                        creator={creator}
                        isFull={false}
                      />
                    </CardActionArea>
                  </Link>
                </Grid>
              ))
            ),
            ...(shouldShowSkeleton
              ? new Array(4).fill(null).map((_, index) => (
                  <Grid item key={index} xs={12} sm={4} md={4} lg={3}>
                    <AssetCardSkeleton isFull={false} />
                  </Grid>
                ))
              : []),
          ]}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
};
