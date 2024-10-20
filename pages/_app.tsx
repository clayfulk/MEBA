import { AppProps } from 'next/app';
import Head from 'next/head';
import '../pages/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>My App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;