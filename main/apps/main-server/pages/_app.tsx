import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppProvider } from '@main/ui';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider user={pageProps.user} guest={pageProps.guest}>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
