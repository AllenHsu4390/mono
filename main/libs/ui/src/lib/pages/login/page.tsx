import { Button } from '@mui/material';

interface Props {
  loginUrl: string;
}

export default function LoginPage({ loginUrl }: Props) {
  const login = async () => {
    const response = await fetch(loginUrl, {
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
  return <Button onClick={login}>Login</Button>;
}
