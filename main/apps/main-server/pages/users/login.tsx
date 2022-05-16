import { NextPage } from 'next';
import { LoginPage } from '@main/ui';
import { getSession } from '@main/rest';
import { SessionResponse } from '@main/rest-models';

interface Props {
  sess: SessionResponse;
}

export async function getServerSideProps() {
  const sess = await getSession();
  const props = {
    sess,
  };

  return {
    props,
  };
}

const Login: NextPage<Props> = ({ sess }) => {
  return <LoginPage loginUrl={sess.links.login.url} />;
};

export default Login;
