import { NextPage } from 'next';
import { LoginPage } from '@main/ui';

const Login: NextPage = () => {
  return <LoginPage loginUrl={`/api/users/me`} userUrl={`/api/users/me`} />;
};

export default Login;
