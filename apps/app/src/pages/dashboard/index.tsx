import React from "react";
import { CreateTeamModal } from "../../components/dashboard/teams/CreateTeamModal";
import { TeamManager } from "../../components/dashboard/teams/TeamManager";
import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderLink,
  PageSubHeader,
} from "../../components/layout";
import { useUserProfileQuery } from "../../generated/graphql";
import { AppServerSideProps, initAppProps } from "../../server/ssr/props";
import { AuthContextProvider } from "../../supabase/AuthContext";

export const getServerSideProps = initAppProps;

export default function Dashboard({ user }: AppServerSideProps) {
  return (
    <AuthContextProvider sessionUser={user}>
      <DashboardContent />
    </AuthContextProvider>
  );
}

const DashboardContent = () => {
  const { data } = useUserProfileQuery();

  const links: Array<PageHeaderLink> = [
    { title: "Overview", href: `/dashboard` },
    { title: "Settings", href: `/dashboard/settings` },
  ];

  const breadcrumbs: PageHeaderLink[] =
    data && data?.getUserProfile
      ? [{ title: data.getUserProfile.name, href: `/dashboard` }]
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
