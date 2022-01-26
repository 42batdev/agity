import React from "react";
import { PageHeaderLink, PageSubHeader } from "ui";
import { TeamManager } from "../../components/dashboard/TeamManager";
import { CreateTeamModal } from "../../components/dashboard/CreateTeamModal";
import { AgityAppLayout } from "../../components/dashboard/AgityAppLayout";
import {
  DashboardServerSideProps,
  initAppDashboardProps,
} from "../../utils/ssr/serversideprops";

export const dashboardLinks: Array<PageHeaderLink> = [
  { title: "Overview", href: `/dashboard` },
  { title: "Settings", href: `/dashboard/settings` },
];

const Dashboard = (props: DashboardServerSideProps) => {
  return (
    <AgityAppLayout {...props} title={"Agity Dashboard"} links={dashboardLinks}>
      <PageSubHeader
        title="Your Teams"
        subTitle={"The Teams you have access to"}
        actions={<CreateTeamModal />}
      />
      <TeamManager />
    </AgityAppLayout>
  );
};

export const getServerSideProps = initAppDashboardProps;

export default Dashboard;
