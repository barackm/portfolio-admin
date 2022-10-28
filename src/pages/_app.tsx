import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AuthCheck from '../AuthCheck';
import Layout from '../components/Layout/Layout';
import store from '../store';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Barack M. | Admin</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ToastContainer />
      <AuthCheck>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthCheck>
    </Provider>
  );
}

export default MyApp;
