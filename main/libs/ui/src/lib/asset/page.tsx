import { useQuery } from 'react-query';
import { Container } from '@mui/material';
import { Asset, Creator } from '@main/models';
import Page from '../_base/page';
import { AssetCard } from './card';
import { AssetCardSkeleton } from './skeleton';

interface Props {
  creatorId?: string;
  assetId?: string;
}

interface Response {
  asset: Asset;
  creator: Creator;
}

export default function AssetPage({ assetId, creatorId }: Props) {
  const { data, status } = useQuery<Response, Error>(
    ['asset', assetId, creatorId],
    async () => {
      const asset = await (await fetch(`/api/assets/${assetId}`)).json();
      const creator = await (await fetch(`/api/creators/${creatorId}`)).json();
      return {
        asset,
        creator,
      };
    }
  );

  const shouldShowSkeleton =
    status === 'loading' ||
    status === 'error' ||
    !data?.asset.src ||
    !data?.creator;

  return (
    <Page hasNavigation={true} hasFooter={true}>
      <Container
        sx={{
          paddingY: '8px',
        }}
        maxWidth="md"
      >
        {shouldShowSkeleton ? (
          <AssetCardSkeleton isFull={true} />
        ) : (
          <AssetCard asset={data.asset} creator={data.creator} isFull={true} />
        )}
      </Container>
    </Page>
  );
}
