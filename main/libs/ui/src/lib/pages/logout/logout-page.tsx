import { useEffect } from 'react';
import { useLogout } from '../../hooks/use-logout';

export const LogoutPage = () => {
  const { sendLogout } = useLogout();

  useEffect(() => {
    sendLogout();
  }, [sendLogout]);

  return <div>Logging out...</div>;
};
