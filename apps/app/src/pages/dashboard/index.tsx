import Head from "next/head";
import React from "react";
import { Page, PageContent, PageHeader } from "ui";

const Dashboard = () => {
  return (
    <Page>
      <Head>
        <title>Your Agity Teams</title>
      </Head>
      <PageHeader />
      <PageContent>CONTENT</PageContent>
    </Page>
  );
};

export default Dashboard;
