import { CreatorProfile } from './creator-profile';
import { AssetGrid } from './asset-grid';
import Page from './page';
import { Creator } from '@main/models';
import { useQuery } from 'react-query';

interface Props {
  creatorId: string;
}

export default function AlbumPage({ creatorId }: Props) {
  const { data, status } = useQuery<Creator, Error>(
    ['creator', creatorId],
    async () => {
      const res = await fetch(`/api/creators/${creatorId}`);
      return res.json();
    }
  );

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error' || !data) {
    return <div>Error</div>;
  }

  return (
    <Page hasFooter={true}>
      <CreatorProfile creator={data} />
      <AssetGrid creator={data} />
    </Page>
  );
}
