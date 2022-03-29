import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { AssetPage, LoginPage } from '@main/ui';

interface Props {
  isLoggedIn: boolean;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const idKey = req.cookies.idKey;
  return {
    props: {
      isLoggedIn: !!idKey,
    },
  };
};

const AssetNextPage: NextPage<Props> = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return <div>Error</div>;
  }

  return <AssetPage id={id} />;
};

export default AssetNextPage;
