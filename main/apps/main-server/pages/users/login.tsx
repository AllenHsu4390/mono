import { getGuest } from '@main/rest';
import { LoginPage } from '@main/ui';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      guest: getGuest(),
    },
  };
};

export default LoginPage;
