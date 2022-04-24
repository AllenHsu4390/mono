import { LogoutPage } from '@main/ui';
import { NextPage } from 'next';

import { Session } from '@main/models';
import { getSession, SessionResponse } from '@main/rest';

interface Props {
  session: Session & SessionResponse;
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
  return (
    <LogoutPage
      logoutUrl={session.links.find((l) => l.rel === 'logout').url || '/404'}
    />
  );
};

export default Logout;
