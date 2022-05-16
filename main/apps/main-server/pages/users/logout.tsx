import { LogoutPage } from '@main/ui';
import { NextPage } from 'next';

import { getSession } from '@main/rest';
import { SessionResponse } from '@main/rest-models';

interface Props {
  sess: SessionResponse;
}

export async function getServerSideProps() {
  const sess = await getSession();
  return {
    props: {
      sess,
    },
  };
}

const Logout: NextPage<Props> = (props) => {
  const { sess } = props;
  return <LogoutPage logoutUrl={sess.links.logout.url} />;
};

export default Logout;
