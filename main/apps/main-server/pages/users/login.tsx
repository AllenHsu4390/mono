import { getGuestResponse } from '@main/next-utils';
import { LoginPage } from '@main/ui';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      guest: getGuestResponse(),
    },
  };
};

export default LoginPage;
