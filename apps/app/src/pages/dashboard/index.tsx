import React from "react";
import { CreateTeamModal } from "../../components/dashboard/CreateTeamModal";
import { TeamManager } from "../../components/dashboard/TeamManager";
import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderLink,
  PageSubHeader,
} from "../../components/layout";
import { initAppProps } from "../../server/ssr/props";
import { useActiveUserProfileQuery } from "../../utils/hooks/profile";

export const getServerSideProps = initAppProps;

export default function Dashboard() {
  return <DashboardContent />;
}

const DashboardContent = () => {
  const { data } = useActiveUserProfileQuery();

  const links: Array<PageHeaderLink> = [
    { title: "Overview", href: `/dashboard` },
    { title: "Settings", href: `/dashboard/settings` },
  ];

  const breadcrumbs: Array<PageHeaderLink> = data
    ? [{ title: data?.getUserProfile.name, href: `/dashboard` }]
    : [];

  return (
    <Page>
      <PageHeader links={links} breadcrumbs={breadcrumbs} />
      <PageContent>
        <PageSubHeader
          title="Your Teams"
          subTitle={"The Teams you have access to"}
          actions={<CreateTeamModal />}
        />
        <TeamManager />
      </PageContent>
    </Page>
  );
};
