import {
  Page,
  PageContent,
  PageHeader,
  PageSubHeader,
} from "../../../components/layout/page";
import {
  AppServerSideProps,
  initSupabaseProps,
} from "../../../server/ssr/props";
import { AuthContextProvider } from "../../../supabase/AuthContext";
import { useUserPageHeaderLinks } from "../useDashboardPageHeaderLinks";
import { CreateTeamModal } from "./components/CreateTeamModal";
import { TeamList } from "./components/TeamList";
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
  const { links, breadcrumbs } = useUserPageHeaderLinks();

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
