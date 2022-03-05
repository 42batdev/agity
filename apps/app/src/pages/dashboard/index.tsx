import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderLink,
  PageSubHeader,
} from "../../components/common/layout/page";
import { CreateTeamModal } from "../../components/dashboard/teams/CreateTeamModal";
import { TeamList } from "../../components/dashboard/teams/TeamList";
import { useUserProfileQuery } from "../../generated/graphql";
import { AppServerSideProps, initSupabaseProps } from "../../server/ssr/props";
import { AuthContextProvider } from "../../supabase/AuthContext";
import React from "react";

export const getServerSideProps = initSupabaseProps;

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
        <TeamList />
      </PageContent>
    </Page>
  );
};
