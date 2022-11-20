import "../styles/scss/styles.scss";
import Head from "next/head";
import Router from "next/router";

// Toast
import { ToastContainer } from "react-toastify";

// Progess
import NProgress from "nprogress";
import "nprogress/nprogress.css";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

import { ContextProvider } from "context";
import ThemePrepare from "components/Layout/ThemePrepare";
import Layout from "components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Depok App</title>
      </Head>
      <ToastContainer />
      <ContextProvider>
        <ThemePrepare>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemePrepare>
      </ContextProvider>
    </>
  );
}

export default MyApp;
