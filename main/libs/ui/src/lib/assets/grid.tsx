import React from 'react';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { CardActionArea, Container, Grid } from '@mui/material';
import { Assets, Creator } from '@main/models';
import { Error } from '@main/models';
import Link from 'next/link';
import { AssetCard } from '../asset/card';
import { AssetCardSkeleton } from '../asset/skeleton';

const fetchAssets = async ({ pageParam = 0 }) => {
  const response = await fetch(`/api/assets?pageId=${pageParam}`);
  return response.json();
};

interface Props {
  creator: Creator;
}

export const AssetsGrid: React.FC<Props> = ({ creator }) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery<Assets, Error>('assets', fetchAssets, {
      getNextPageParam: (lastPage, pages) => {
        if (typeof lastPage.pagination.next === 'undefined') return undefined;
        if (typeof lastPage.pagination.total === 'undefined') return undefined;
        if (lastPage.pagination.next) return lastPage.pagination.next;
        return undefined;
      },
    });

  const assetPages = data?.pages || [];
  const shouldShowSkeleton =
    isLoading || isError || !data || assetPages.length === 0;

  return (
    <Container
      sx={{
        paddingY: '8px',
      }}
    >
      <InfiniteScroll hasMore={hasNextPage} loadMore={(_) => fetchNextPage()}>
        <Grid
          container
          spacing={{
            xs: 1,
            sm: 2,
            md: 3,
          }}
        >
          {[
            ...assetPages.map((page: Assets) =>
              page.assets.map((asset) => (
                <Grid item key={asset.id} xs={12} sm={4} md={4} lg={3}>
                  <Link
                    href={`/${creator.id}/assets/${asset.id}`}
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
