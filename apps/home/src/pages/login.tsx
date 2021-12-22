import Head from "next/head";
import React, { ReactElement } from "react";
import { HomeLayout } from "../components/HomeLayout";
import { LoginComponent } from "../components/login/LoginComponent";

const Login = () => {
  return (
    <>
      <Head>
        <title>A G I T Y Login</title>
      </Head>
      <LoginComponent />
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout page={page} />;
};

export default Login;
