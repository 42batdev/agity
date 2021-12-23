import Head from "next/head";
import React from "react";
import { LoginComponent } from "../../components/login/LoginComponent";

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

export default Login;
