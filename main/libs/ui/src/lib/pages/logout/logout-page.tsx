export default function LogoutPage() {
  const logout = async () => {
    const response = await fetch('/api/users/logout', {
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
