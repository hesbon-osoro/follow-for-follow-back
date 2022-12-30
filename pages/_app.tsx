import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import '../styles/globals.css';
import '../styles/droplet.css';
import '../styles/profile.css';
import '../styles/following.css';
import '../styles/flipcard.css';
import '../styles/modal.css';
import '../styles/errorBoundary.css';
import '../styles/menu.css';
import '../styles/rateLimitModal.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
