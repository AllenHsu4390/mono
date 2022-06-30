import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid } from '@mui/material';
import { AssetCard } from '../asset/card';
import { AssetCardSkeleton } from '../asset/skeleton';
import Link from '../../element/link';
import type { AssetsResponse, CreatorResponse } from '@main/rest-models';
import { AddAssetCard } from '../add-asset-card/add-asset-card';
import { useUser } from '../../hooks/use-user';

interface Props {
  hasNextPage: boolean;
  loadMore(page: number): void;
  assetPages: AssetsResponse[];
  initialAssets: AssetsResponse;
  creator?: CreatorResponse;
  shouldShowSkeleton: boolean;
}

const Item = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid item xs={12} sm={4} md={3} lg={3}>
      {children}
    </Grid>
  );
};

const assetToItem = (
  asset: AssetsResponse['assets'][0],
  url: string,
  isPreloaded?: boolean
) => {
  return (
    <Item key={asset.id}>
      <Link to={url} key={asset.id} scroll={false}>
        <AssetCard asset={asset} isPreloaded={isPreloaded} />
      </Link>
    </Item>
  );
};

export const AssetsGrid = ({
  hasNextPage,
  loadMore,
  assetPages,
  shouldShowSkeleton,
  initialAssets,
  creator,
}: Props) => {
  const { user } = useUser();

  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={loadMore}>
      <Grid container spacing={0.5}>
        {[
          ...[
            user && creator?.links.newAsset ? (
              <Item key="add-asset">
                <AddAssetCard
                  key={user.creatorId}
                  creator={creator}
                  assets={initialAssets}
                />
              </Item>
            ) : (
              []
            ),
          ],
          ...initialAssets.assets.map((asset, index) =>
            assetToItem(asset, initialAssets.links.assets[index], true)
          ),
          ...assetPages.map((page: AssetsResponse) =>
            page.assets.map((asset, index) =>
              assetToItem(asset, page.links.assets[index])
            )
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
