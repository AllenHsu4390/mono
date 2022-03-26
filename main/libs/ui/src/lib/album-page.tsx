import { CreatorProfile } from './creator-profile';
import { AssetGrid } from './asset-grid';
import Page from './page';
import { Creator } from '@main/models';
import { useQuery } from 'react-query';

export default function AlbumPage() {
  const { data, status } = useQuery<Creator, Error>(
    ['creator', '10'],
    async () => {
      const res = await fetch(`/api/creators/${10}`);
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
      <AssetGrid />
    </Page>
  );
}
