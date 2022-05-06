import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid } from '@mui/material';
import { AssetCard } from '../asset/card';
import { AssetCardSkeleton } from '../asset/skeleton';
import Link from '../../element/link';
import { AssetsResponse } from '@main/rest-models';

interface Props {
  hasNextPage: boolean;
  loadMore(page: number): void;
  assetPages: AssetsResponse[];
  shouldShowSkeleton: boolean;
}

const Item = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid item xs={12} sm={4} md={3} lg={3}>
      {children}
    </Grid>
  );
};

export const AssetsGrid = ({
  hasNextPage,
  loadMore,
  assetPages,
  shouldShowSkeleton,
}: Props) => {
  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={loadMore}>
      <Grid container spacing={0.5}>
        {[
          ...assetPages.map((page: AssetsResponse) =>
            page.assets.map((asset, index) => (
              <Item key={asset.id}>
                <Link to={page.links.asset[index].url} key={asset.id}>
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
