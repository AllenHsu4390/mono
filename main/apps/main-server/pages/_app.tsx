import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppProvider } from '@main/ui';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider user={pageProps.user || undefined}>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
