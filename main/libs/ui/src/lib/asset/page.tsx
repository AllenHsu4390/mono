import { useQuery } from 'react-query';
import { Container } from '@mui/material';
import { Asset, Creator } from '@main/models';
import Page from '../_base/page';
import { AssetCard } from './card';
import { AssetCardSkeleton } from './skeleton';

interface Props {
  assetUrl: string;
  creatorUrl: string;
}

interface AssetResponse {
  links: {
    rel: string;
    url: string;
  }[];
}

interface CreatorResponse {
  links: {
    rel: string;
    url: string;
  }[];
}

interface Response {
  asset: Asset & AssetResponse;
  creator: Creator & CreatorResponse;
}

export default function AssetPage({ assetUrl, creatorUrl }: Props) {
  const { data, status } = useQuery<Response, Error>(
    ['asset', assetUrl, creatorUrl],
    async () => {
      const asset = await (await fetch(assetUrl)).json();
      const creator = await (await fetch(creatorUrl)).json();
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
          pt: 16,
          pb: 10,
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
