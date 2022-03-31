import { GetServerSideProps, NextPage } from 'next';
import { AlbumPage, LoginPage } from '@main/ui';

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

const Home: NextPage<Props> = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return <AlbumPage />;
};

export default Home;
