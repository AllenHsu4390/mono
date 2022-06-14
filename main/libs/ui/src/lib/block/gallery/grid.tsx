import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid } from '@mui/material';
import { AssetCard } from '../asset/card';
import { AssetCardSkeleton } from '../asset/skeleton';
import Link from '../../element/link';
import {
  AssetsResponse,
  CreatorResponse,
  UserResponse,
} from '@main/rest-models';
import { AddAssetCard } from '../add-asset-card/add-asset-card';

interface Props {
  hasNextPage: boolean;
  loadMore(page: number): void;
  assetPages: AssetsResponse[];
  initialAssets: AssetsResponse;
  user?: UserResponse;
  creator: CreatorResponse;
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
  user,
  creator,
}: Props) => {
  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={loadMore}>
      <Grid container spacing={0.5}>
        {[
          ...[
            user && creator.links.newAsset ? (
              <Item>
                <AddAssetCard key={user.creatorId} creator={creator} />
              </Item>
            ) : (
              []
            ),
          ],
          ...initialAssets.assets.map((asset, index) =>
            assetToItem(asset, initialAssets.links.assets[index].url, true)
          ),
          ...assetPages.map((page: AssetsResponse) =>
            page.assets.map((asset, index) =>
              assetToItem(asset, page.links.assets[index].url)
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
