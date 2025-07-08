// pages/_app.tsx
import type { AppProps } from 'next/app';
import { AuthProvider } from 'src/context/AuthContext';
import { DeveloperModalProvider } from 'src/context/ModalContext';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
       <DeveloperModalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </DeveloperModalProvider>
    </AuthProvider>
  );
}
