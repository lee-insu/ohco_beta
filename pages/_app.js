import Layout from "../components/Layout";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "../service/apollo";
import { wrapper } from "../store";
import { useEffect } from "react";
import { analytics, authService } from "../service/firebase";
import { useDispatch } from "react-redux";
import * as userAction from "../store/modules/user";
import * as emailAction from "../store/modules/email";
import * as uidAction from "../store/modules/uid";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(userAction.getUser(user.displayName));
        dispatch(emailAction.getEmail(user.email));
        dispatch(uidAction.getUid(user.uid));
      }
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>OHCO | 나를 표현하는 코디 </title>
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta propery="og:type" content="website" />
        <meta property="og:title" content="OH CO!" />
        <meta
          property="og:description"
          content="OH CO! | 나를 표현하는 코디를 찾아보세요. 다양한 코디와 기준으로 여러분의 분위기에 맞는 코디를 찾아 드립니다."
        />
        <meta property="og:image" content="/img/logo.jpg" />
        <meta property="og:site_name" content="ohco" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="icon" href="/img/logo.jpg" />
        <link rel="apple-touch-icon" href="/img/logo.jpg" />
        <link rel="short icon" type="image/x-icon" href="/img/logo.jpg" />
        <link rel="apple-touch-icon" href="/img/logo.jpg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default wrapper.withRedux(MyApp);
