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
import { logEvent } from "firebase/analytics";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    logEvent(analytics, "user_insert");
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
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default wrapper.withRedux(MyApp);
