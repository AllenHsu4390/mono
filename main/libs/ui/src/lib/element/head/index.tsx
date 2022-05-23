import NextHead from 'next/head';

export default function Head({ children }: { children: React.ReactNode }) {
  return <NextHead>{children}</NextHead>;
}
