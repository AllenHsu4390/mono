interface Props {
  logoutUrl: string;
}

export default function LoginPage({ logoutUrl }: Props) {
  const logout = async () => {
    const response = await fetch(logoutUrl, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        isSignedIn: false,
      }),
    });
    if (response.ok) {
      window.location.href = '/';
    }
  };
  logout();
  return <div>Logging out...</div>;
}