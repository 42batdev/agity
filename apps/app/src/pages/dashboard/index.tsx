import Head from "next/head";
import React from "react";
import { Page, PageContent, PageHeader, PageSubHeader } from "ui";
import { TeamManager } from "../../components/teams/TeamManager";
import { CreateTeamModal } from "../../components/teams/CreateTeamModal";

const Dashboard = () => {
  return (
    <Page>
      <Head>
        <title>Your Agity Teams</title>
      </Head>
      <PageHeader
        links={[
          { title: "Overview", href: "/dashboard" },
          { title: "Activity", href: "/dashboard/activity" },
          { title: "Settings", href: "/dashboard/settings" },
        ]}
      />
      <PageContent>
        <PageSubHeader title="Your Teams" actions={<CreateTeamModal />} />
        <TeamManager />
      </PageContent>
    </Page>
  );
};

export default Dashboard;
