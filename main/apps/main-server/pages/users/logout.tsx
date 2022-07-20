import { getGuestResponse } from '@main/next-utils';
import { LogoutPage } from '@main/ui';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      guest: getGuestResponse(),
    },
  };
};

export default LogoutPage;
