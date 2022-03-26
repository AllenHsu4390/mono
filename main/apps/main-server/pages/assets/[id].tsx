import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AssetPage } from '@main/ui';

const AssetNextPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return <div>Error</div>;
  }

  return <AssetPage id={id} />;
};

export default AssetNextPage;
