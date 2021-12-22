import Head from "next/head";
import React, { ReactElement } from "react";
import { HomeLayout } from "../components/HomeLayout";
import { IndexComponent } from "../components/index/IndexComponent";

const Index = () => {
  return (
    <>
      <Head>
        <title>A G I T Y</title>
      </Head>
      <IndexComponent />
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout page={page} />;
};

export default Index;
