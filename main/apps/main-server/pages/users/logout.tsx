import { LogoutPage } from '@main/ui';
import { NextPage } from 'next';

const Logout: NextPage = () => {
  return <LogoutPage logoutUrl={`/api/users/me`} />;
};

export default Logout;
