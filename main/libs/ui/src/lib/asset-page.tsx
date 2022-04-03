import { AssetCard } from './asset-card';
import { Container } from '@mui/material';
import Page from './page';
import { Asset, Creator } from '@main/models';
import { useQuery } from 'react-query';

interface Props {
  creatorId: string;
  assetId: string;
}

interface Response {
  asset: Asset;
  creator: Creator;
}

export default function AssetPage({ assetId, creatorId }: Props) {
  const { data, status } = useQuery<Response, Error>(
    ['asset', assetId],
    async () => {
      const asset = await (await fetch(`/api/assets/${assetId}`)).json();
      const creator = await (await fetch(`/api/creators/${0}`)).json();
      return {
        asset,
        creator,
      };
    }
  );

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error' || !data?.asset.src || !data?.creator) {
    return <div>Error</div>;
  }

  return (
    <Page>
      <Container
        sx={{
          paddingY: '8px',
        }}
        maxWidth="md"
      >
        <AssetCard asset={data.asset} creator={data.creator} isFull={true} />
      </Container>
    </Page>
  );
}
