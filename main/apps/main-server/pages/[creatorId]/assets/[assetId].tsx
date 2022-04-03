import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AssetPage } from '@main/ui';

const AssetNextPage: NextPage = () => {
  const router = useRouter();
  const { creatorId, assetId } = router.query;

  if (!assetId || typeof assetId !== 'string') {
    return <div>Error</div>;
  }

  if (!creatorId || typeof creatorId !== 'string') {
    return <div>Error</div>;
  }

  return <AssetPage assetId={assetId} creatorId={creatorId} />;
};

export default AssetNextPage;
