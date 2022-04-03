import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AlbumPage } from '@main/ui';

const AssetNextPage: NextPage = () => {
  const router = useRouter();
  const { creatorId } = router.query;

  if (!creatorId || typeof creatorId !== 'string') {
    return <div>Error</div>;
  }

  return <AlbumPage creatorId={creatorId} />;
};

export default AssetNextPage;
