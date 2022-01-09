import Head from "next/head";
import React from "react";
import { Page, PageContent, PageHeader, PageSubHeader } from "ui";

const Activity = () => {
  return (
    <Page>
      <Head>
        <title>Agity Activity</title>
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
          title="Recent Activity"
          subTitle={"Your most recent account activity"}
        />
        Nothing to see here
      </PageContent>
    </Page>
  );
};

export default Activity;
