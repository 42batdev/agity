import Head from "next/head";
import React from "react";
import { SessionContextProvider } from "supabase";
import { Page, PageContent, PageHeader, PageSubHeader } from "ui";

const Activity = () => {
  return (
    <SessionContextProvider>
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
    </SessionContextProvider>
  );
};

export default Activity;
