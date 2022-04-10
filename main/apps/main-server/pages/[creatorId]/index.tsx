import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AlbumPage } from '@main/ui';

const AssetNextPage: NextPage = () => {
  const router = useRouter();
  const { creatorId } = router.query;

  return (
    <AlbumPage
      userUrl={`/api/users/me`}
      creatorUrl={`/api/creators/${creatorId}`}
    />
  );
};

export default AssetNextPage;
