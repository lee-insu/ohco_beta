import Head from "next/head";
import React from "react";
import Sticky from "react-sticky-el";
import style from "../styles/Layout.module.css";
import FooterInfo from "./FooterInfo";

import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className={style.container}>
      <Head></Head>
      <Sticky stickyStyle={{ zIndex: 2 }}>
        <Header />
      </Sticky>
      <div>{children}</div>
      <FooterInfo />
    </div>
  );
};

export default Layout;
