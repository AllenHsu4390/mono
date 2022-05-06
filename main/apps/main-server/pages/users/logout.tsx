import { LogoutPage } from '@main/ui';
import { NextPage } from 'next';

import { getSession } from '@main/rest';
import { SessionResponse } from '@main/rest-models';

interface Props {
  session: SessionResponse;
}

export async function getServerSideProps() {
  const session = await getSession();
  const props: Props = {
    session,
  };

  return {
    props,
  };
}

const Logout: NextPage<Props> = ({ session }) => {
  return <LogoutPage logoutUrl={session.links.logout.url} />;
};

export default Logout;
