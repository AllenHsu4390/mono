import { ScrollResetProvider } from '../hooks/use-scroll-reset';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollResetProvider>{children}</ScrollResetProvider>
    </QueryClientProvider>
  );
};
