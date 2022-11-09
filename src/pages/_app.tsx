import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AuthCheck from '../AuthCheck';
import Layout from '../components/Layout/Layout';
import store from '../store';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import axios from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (params) => axios(params).then((res) => res.data),
      }}
    >
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
    </SWRConfig>
  );
}
export default MyApp;
