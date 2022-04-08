import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AssetPage } from '@main/ui';

const AssetNextPage: NextPage = () => {
  const router = useRouter();
  const { creatorId, assetId } = router.query;

  return (
    <AssetPage
      assetId={!assetId || typeof assetId !== 'string' ? undefined : assetId}
      creatorId={
        !creatorId || typeof creatorId !== 'string' ? undefined : creatorId
      }
    />
  );
};

export default AssetNextPage;
