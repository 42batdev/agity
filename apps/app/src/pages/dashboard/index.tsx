import React from "react";
import { PageHeaderLink, PageSubHeader } from "ui";
import { TeamManager } from "../../components/dashboard/TeamManager";
import { CreateTeamModal } from "../../components/dashboard/CreateTeamModal";
import { AgityAppLayout } from "../../components/dashboard/AgityAppLayout";
import {
  DashboardServerSideProps,
  initAppDashboardProps,
} from "../../utils/ssr/serversideprops";
import { SessionContextProvider, useProfile } from "supabase";

export const getServerSideProps = initAppDashboardProps;

export default function (props: DashboardServerSideProps) {
  return (
    <SessionContextProvider>
      <DashboardContent {...props} />
    </SessionContextProvider>
  );
}

const DashboardContent = (props: DashboardServerSideProps) => {
  const profile = useProfile();

  const dashboardLinks: Array<PageHeaderLink> = [
    { title: "Overview", href: `/dashboard` },
    { title: "Settings", href: `/dashboard/settings` },
  ];

  const breadcrumbs: Array<PageHeaderLink> = [
    { title: profile.name, href: `/dashboard` },
  ];

  return (
    <AgityAppLayout
      {...props}
      title={"Agity Dashboard"}
      links={dashboardLinks}
      breadcrumbs={breadcrumbs}
    >
      <PageSubHeader
        title="Your Teams"
        subTitle={"The Teams you have access to"}
        actions={<CreateTeamModal />}
      />
      <TeamManager />
    </AgityAppLayout>
  );
};
