import { NextPage } from 'next';
import { LoginPage } from '@main/ui';
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

const Login: NextPage<Props> = ({ session }) => {
  return (
    <LoginPage
      loginUrl={session.links.find((l) => l.rel === 'login').url || '/404'}
    />
  );
};

export default Login;
