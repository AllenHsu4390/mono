import { NextPage } from 'next';
import { LoginPage } from '@main/ui';
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

const Login: NextPage<Props> = ({ session }) => {
  return <LoginPage loginUrl={session.links.login.url} />;
};

export default Login;
