import { Button, Container } from '@mui/material';
import Page from './page';

export default function LoginPage() {
  const login = async () => {
    const response = await fetch('/api/users/me', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        isLoggedIn: true,
      }),
    });
    if (response.ok) {
      window.location.href = '/';
    }
  };
  return (
    <Page>
      <Button onClick={login}>Login</Button>
    </Page>
  );
}
