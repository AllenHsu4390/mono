import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AssetPage } from '@main/ui';

const AssetNextPage: NextPage = () => {
  const router = useRouter();
  const { creatorId, assetId } = router.query;

  return (
    <AssetPage
      userUrl={`/api/users/me`}
      assetUrl={`/api/assets/${assetId}`}
      creatorUrl={`/api/creators/${creatorId}`}
    />
  );
};

export default AssetNextPage;
