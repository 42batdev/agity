import Head from "next/head";
import React from "react";
import { Page, PageContent, PageHeader, PageSubHeader } from "ui";

const Settings = () => {
  return (
    <Page>
      <Head>
        <title>Agity Settings</title>
      </Head>
      <PageHeader
        links={[
          { title: "Overview", href: "/dashboard" },
          { title: "Activity", href: "/dashboard/activity" },
          { title: "Settings", href: "/dashboard/settings" },
        ]}
      />
      <PageContent>
        <PageSubHeader
          title="Profile & Settings"
          subTitle={"Your personal account"}
        />
        Nothing to see here
      </PageContent>
    </Page>
  );
};

export default Settings;
