import { AssetCard } from './asset-card';
import { Container } from '@mui/material';
import Page from './page';
import { Asset } from '@main/models';
import { useQuery } from 'react-query';

interface Props {
  id: string;
}

export default function AssetPage({ id }: Props) {
  const { data, status } = useQuery<Asset, Error>(['asset', id], async () => {
    const res = await fetch(`/api/assets/${id}`);
    return res.json();
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error' || !data?.src) {
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
        <AssetCard src={data.src} isFull={true} />
      </Container>
    </Page>
  );
}
