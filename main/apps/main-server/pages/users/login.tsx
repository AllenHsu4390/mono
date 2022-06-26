import { rest } from '@main/rest';
import { LoginPage } from '@main/ui';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      guest: await rest.guests.start.get(),
    },
  };
};

export default LoginPage;
