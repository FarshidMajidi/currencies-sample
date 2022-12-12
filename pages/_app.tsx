import { useState } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from 'react-query';
import '../styles/globals.css';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: any) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
